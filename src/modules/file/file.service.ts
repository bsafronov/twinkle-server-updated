import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from './schemas/file.schema';
import { Model } from 'mongoose';
import {
  FileProps,
  UploadFileDTO,
  UploadFilesProps,
} from './dto/create-file.dto';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  createFile(file: FileProps): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '../../static', file.fieldname);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return file.fieldname + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async upload(data: UploadFilesProps) {
    const { files, owner } = data;
    const result = [];
    for (const file of files) {
      const imagePath = this.createFile(file);
      const fileData: UploadFileDTO = {
        owner: owner.id,
        path: imagePath,
        type: FileType.IMAGE,
      };
      const createdFile = await this.fileModel.create({ ...fileData });
      const displayFileData = {
        type: createdFile.type,
        desc: createdFile.path,
      };
      result.push(displayFileData);
    }
    return result;
  }

  async removeFile() {}
}

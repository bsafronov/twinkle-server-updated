import {
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../security/guards/jwtAuthGuard';
import { UploadFilesProps } from './dto/create-file.dto';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 9 },
      { name: 'audio', maxCount: 9 },
    ]),
  )
  upload(@Req() request) {
    const { image, audio } = request.files;
    const user = request.user;
    const data: UploadFilesProps = {
      files: [...image, ...audio],
      owner: user,
    };

    return this.fileService.upload(data);
  }
}

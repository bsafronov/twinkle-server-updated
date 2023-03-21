import { TokenAuthDTO } from 'src/modules/security/token/dto/token-auth.dto';
import { FileType } from '../file.service';

export interface UploadFileDTO {
  owner: string;
  path: string;
  type: FileType;
}

export interface UploadFilesProps {
  owner: TokenAuthDTO;
  files: FileProps[];
}

export interface FileProps {
  fieldname: FileType;
  originalname: string;
  buffer: any;
}

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/baseSchema';
import { User } from 'src/modules/user/schemas/user.schema';
import { Wall } from 'src/modules/wall/schemas/wall.schema';
import { FileType } from '../file.service';

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ required: true })
  path: string;

  @Prop({ enum: FileType, required: true })
  type: FileType;
}

export const FileSchema = SchemaFactory.createForClass(File);

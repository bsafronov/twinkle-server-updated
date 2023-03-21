import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/baseSchema';
import { PostComment } from 'src/modules/post/schemas/post-comment.schema';
import { PostLike } from 'src/modules/post/schemas/post-like.schema';
import { Wall } from 'src/modules/wall/schemas/wall.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User extends BaseSchema {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wall', required: true })
  wall: Wall;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostLike' }] })
  likes: PostLike[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostComment' }],
  })
  comments: PostComment[];
}

export const UserSchema = SchemaFactory.createForClass(User);

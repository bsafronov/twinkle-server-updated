import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import { Post } from './Post.schema';

export type PostCommentDocument = HydratedDocument<PostComment>;

@Schema({
  timestamps: true,
})
export class PostComment {
  id: string;
  createdAt: string;
  updatedAt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Post;

  @Prop({ required: true })
  desc: string;
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);

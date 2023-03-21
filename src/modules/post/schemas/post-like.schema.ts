import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import { Post } from './Post.schema';

export type PostLikeDocument = HydratedDocument<PostLike>;

@Schema({
  timestamps: true,
})
export class PostLike {
  id: string;
  createdAt: string;
  updatedAt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Post;
}

export const PostLikeSchema = SchemaFactory.createForClass(PostLike);

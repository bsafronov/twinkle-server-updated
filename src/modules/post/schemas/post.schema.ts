import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/baseSchema';
import { User } from 'src/modules/user/schemas/user.schema';
import { Wall } from 'src/modules/wall/schemas/wall.schema';
import { PostContentProps } from '../dto/create-post.dto';
import { PostComment } from './post-comment.schema';
import { PostLike } from './post-like.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true,
})
export class Post extends BaseSchema {
  @Prop({ required: true })
  content: PostContentProps[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wall', required: true })
  wall: Wall;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostComment' }],
  })
  comments: PostComment[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostLike' }],
  })
  likes: PostLike[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

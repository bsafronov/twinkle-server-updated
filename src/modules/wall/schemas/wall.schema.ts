import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/modules/post/schemas/Post.schema';
import { User } from 'src/modules/user/schemas/user.schema';

export type WallDocument = HydratedDocument<Wall>;

@Schema()
export class Wall {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}

export const WallSchema = SchemaFactory.createForClass(Wall);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService, FileType } from '../file/file.service';
import { WallService } from '../wall/wall.service';
import { CreatePostDTO } from './dto/create-post.dto';
import {
  PostComment,
  PostCommentDocument,
} from './schemas/post-comment.schema';

import { PostLike, PostLikeDocument } from './schemas/post-like.schema';
import { Post, PostDocument } from './schemas/Post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(PostComment.name)
    private postCommentModel: Model<PostCommentDocument>,
    @InjectModel(PostLike.name) private postLikeModel: Model<PostLikeDocument>,
    private readonly fileService: FileService,
    private wallService: WallService,
  ) {}

  async create(data: CreatePostDTO) {
    const { content, owner_id, wall_id } = data;

    const post = await this.postModel.create({
      owner: owner_id,
      wall: wall_id,
      content,
    });
    this.wallService.addPost(wall_id, post.id);

    return post;
  }

  async likePost(post_id, user_id) {
    const post = await this.postModel.findById(post_id);
    const like = await this.postLikeModel.create({
      owner: user_id,
      post: post.id,
    });
    post.likes.push(like);
    post.save();
  }

  async commentPost(post_id, user_id, desc) {
    const post = await this.postModel.findById(post_id);
    const comment = await this.postCommentModel.create({
      owner: user_id,
      post: post_id,
      desc,
    });
    post.comments.push(comment.id);
    post.save();
  }
}

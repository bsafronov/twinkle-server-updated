import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '../file/file.module';
import { WallModule } from '../wall/wall.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostComment, PostCommentSchema } from './schemas/post-comment.schema';
import { PostLike, PostLikeSchema } from './schemas/post-like.schema';
import { Post, PostSchema } from './schemas/Post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: PostLike.name, schema: PostLikeSchema },
      { name: PostComment.name, schema: PostCommentSchema },
    ]),
    FileModule,
    WallModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}

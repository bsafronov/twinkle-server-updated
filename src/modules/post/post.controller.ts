import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../security/guards/jwtAuthGuard';
import { TokenAuthDTO } from '../security/token/dto/token-auth.dto';
import { CreatePostBodyProps, CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadFiles(@Req() request) {
    const user: TokenAuthDTO = request.user;
    const body: CreatePostBodyProps = request.body;
    const data: CreatePostDTO = {
      owner_id: user.id,
      wall_id: body.wall_id,
      content: body.content,
    };

    return this.postService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('like')
  likePost(@Req() request) {
    const user: TokenAuthDTO = request.user;
    const { post_id } = request.body;

    return this.postService.likePost(post_id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('comment')
  commentPost(@Req() request) {
    const user: TokenAuthDTO = request.user;
    const { post_id, desc } = request.body;

    return this.postService.commentPost(post_id, user.id, desc);
  }
}

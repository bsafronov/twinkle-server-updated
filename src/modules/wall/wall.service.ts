import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wall, WallDocument } from './schemas/wall.schema';

@Injectable()
export class WallService {
  constructor(@InjectModel(Wall.name) private wallModel: Model<WallDocument>) {}

  async create(owner_id: string): Promise<Wall> {
    const wall = await this.wallModel.create({
      owner: owner_id,
    });
    return wall;
  }

  async findById(id: string): Promise<Wall> {
    const wall = await this.wallModel.findById(id);
    return wall;
  }

  async addPost(wall_id, post_id) {
    const wall = await this.wallModel.findById(wall_id);
    wall.posts.push(post_id);
    wall.save();
  }
}

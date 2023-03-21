import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { WallService } from '../wall/wall.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly wallService: WallService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string, password?: boolean): Promise<User> {
    const user = await this.userModel
      .findOne({ username })
      .select(password ? '+password' : '')
      .populate('wall')
      .populate('comments');
    return user;
  }

  async findByEmail(email: string, password?: boolean): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .select(password ? '+password' : '');
  }

  async findById(id: string, password?: boolean): Promise<User> {
    return await this.userModel
      .findById(id)
      .select(password ? '+password' : '');
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      ...dto,
      password: hashPassword,
    });

    const wall = await this.wallService.create(user.id);
    user.wall = wall;
    user.save();

    return user;
  }
}

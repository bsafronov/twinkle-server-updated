import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '../file/file.module';
import { PostModule } from '../post/post.module';
import { AuthModule } from '../security/auth/auth.module';
import { TokenModule } from '../security/token/token.module';
import { UserModule } from '../user/user.module';
import { WallModule } from '../wall/wall.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.ugrqhav.mongodb.net/test`,
    ),
    UserModule,
    AuthModule,
    TokenModule,
    PostModule,
    WallModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

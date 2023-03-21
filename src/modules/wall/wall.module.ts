import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wall, WallSchema } from './schemas/wall.schema';
import { WallService } from './wall.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wall.name, schema: WallSchema }]),
  ],
  providers: [WallService],
  exports: [WallService],
})
export class WallModule {}

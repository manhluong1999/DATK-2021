import { UsersModule } from './../users/users.module';
import { CloudStorageModule } from './../cloud-storage/cloud-storage.module';
import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    CloudStorageModule,
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostService],
  exports: [PostService],
})
export class PostsModule {}

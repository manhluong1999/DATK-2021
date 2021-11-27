import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create () {
    const createdPost = new this.postModel({});
    return createdPost.save();
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find();
  }

  async update(id: string, data: UpdatePostDto) {
    return await this.postModel.updateOne(
      {
        _id: id,
      },
      data,
    );
  }
}

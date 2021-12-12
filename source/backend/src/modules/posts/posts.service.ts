import { CloudStorageService } from './../cloud-storage/cloud-storage.service';
import { CreatePostDto } from './dto/createPost.dto';
import { FindAllQuery } from './dto/find-all.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly storageService: CloudStorageService,
  ) {}

  async getDownloadURL(uid: string) {
    const docs = await this.postModel.find({ uid }).exec();
    const uploadData = {
      aboutme: [],
      lectures: [],
      projects: [],
      software: [],
      publications: []
    }
    for (const doc of docs) {
      uploadData[doc.page].push({
        title: doc.title,
        content: doc.content
      })
    }
    await this.storageService.uploadFile(uploadData, `${uid}.html`);

    return await this.storageService.getdownloadFile(`${uid}.html`);
  }
  async create(data: CreatePostDto) {
    const createdPost = new this.postModel(data);
    return await createdPost.save();
  }

  async findAll(uid: string, query: FindAllQuery): Promise<PostDocument[]> {
    const { page } = query;
    return await this.postModel.find({ uid, page });
  }

  async update(id: string, data: UpdatePostDto) {
    return await this.postModel.updateOne(
      {
        _id: id,
      },
      data,
    );
  }

  async delete(id: string) {
    return await this.postModel.deleteOne({ _id: id });
  }
}

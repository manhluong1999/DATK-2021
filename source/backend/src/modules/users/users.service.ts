import { CloudStorageService } from './../cloud-storage/cloud-storage.service';
import { FindByEmailDto } from './dto/findOne.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import CreateUserDto from './dto/createUser.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly storageService: CloudStorageService,
  ) {}

  async create(userData: CreateUserDto) {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }
  async findByUID(uid: string) {
    return await this.userModel.findOne({ uid });
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async updateOne(
    email: string,
    data: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    if (file) {
      console.log(file);
      const fileName = file.originalname;
      const buffer = file.buffer;
      await this.storageService.uploadImg(fileName, buffer);
      const url = await this.storageService.getdownloadFile(fileName);
      data.imgUrl = url.url;
    }
    return await this.userModel.updateOne(
      {
        email: email,
      },
      data,
    );
  }
}

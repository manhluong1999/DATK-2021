import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import CreateUserDto from "./dto/createUser.dto";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
 ) {}

  async create(userData: CreateUserDto) {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async findAll() : Promise<UserDocument[]> {
    return this.userModel.find();
  }
}

import { Injectable } from "@nestjs/common"
import * as bcrypt from 'bcryptjs'
import { BadRequestExceptionCustom } from "./../../@core/exceptions"
import RegisterDto from "./dto/register.dto"
import { MongoError } from "./../../@core/constants"
import { InternalServerExceptionCustom } from "./../../@core/exceptions"
import { UsersService } from "../users/users.service"

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      return await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error?.code === MongoError.DuplicateKey) {
        throw new BadRequestExceptionCustom(
          "User with that email already exists"
        );
      }
      throw new InternalServerExceptionCustom();
    }
  }
}

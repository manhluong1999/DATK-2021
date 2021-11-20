import { AdminFirebaseConfig } from 'src/@core/config/firebase-admin';
import { BadRequestExceptionCustom } from './../../@core/exceptions/bad-request.exception';
import { LogInDto } from './dto/logIn.dto';
import { Injectable } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import { MongoError } from './../../@core/constants';
import {
  InternalServerExceptionCustom,
  NotFoundExceptionCustom,
  UnAuthorizedExceptionCustom,
} from './../../@core/exceptions';
import { UsersService } from '../users/users.service';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
@Injectable()
export class AuthenticationService {
  authFirebase = getAuth();
  constructor(private readonly usersService: UsersService) {}

  public async register(registrationData: RegisterDto) {
    try {
      const response = await createUserWithEmailAndPassword(
        this.authFirebase,
        registrationData.email,
        registrationData.password,
      );
      return await this.usersService.create({
        ...registrationData,
        uid: response.user.uid,
      });
    } catch (error) {
      if (error?.code === MongoError.DuplicateKey) {
        throw new UnAuthorizedExceptionCustom(
          'User with that email already exists',
        );
      }
      throw new InternalServerExceptionCustom();
    }
  }

  async login(loginData: LogInDto) {
    try {
      const { email, password } = loginData;
      const checkUser = await this.usersService.findByEmail(email);

      if (!checkUser) {
        throw new NotFoundExceptionCustom('User not found');
      }
      const { user } = await signInWithEmailAndPassword(
        this.authFirebase,
        email,
        password,
      );

      if (user) {
        const accessToken = await user.getIdToken();

        return {
          accessToken,
          refreshToken: user?.refreshToken,
          uid: user.uid,
          email: user.email,
        };
      } else {
        throw new UnAuthorizedExceptionCustom('Email or Password is not true');
      }
    } catch (error) {
      throw new BadRequestExceptionCustom();
    }
  }
  async verifyTokenId(token: string) {
    try {
      return await AdminFirebaseConfig.auth().verifyIdToken(token, true);
    } catch (error) {
      throw new BadRequestExceptionCustom();
    }
  }

  async logout() {
    try {
      signOut(this.authFirebase);
      return {
        isSuccess: true
      }
    } catch (error) {
      
    }
  }
}

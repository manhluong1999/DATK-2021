import { AuthGuard } from './modules/authentication/guards/auth.guard';
import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RouterModule } from 'nest-router';
import { ROUTERS } from './@core/config';
import { initFirebase } from './@core/config/firebase-config';
import { HttpErrorFilter } from './@core/filters';
import { LoggingInterceptor } from './@core/interceptors';
import { DatabaseModule } from './database/database.module';
import { MODULES } from './modules';


initFirebase()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
          /** client firebase */
        PUBLIC_FIREBASE_APIKEY: Joi.string().required(),
        PUBLIC_FIREBASE_AUTH_DOMAIN: Joi.string().required(),
      }),
    }),
    RouterModule.forRoutes(ROUTERS),
    DatabaseModule,
    ...MODULES,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}

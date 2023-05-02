import './boilerplate.polyfill';
import 'winston-mongodb';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { format, transports } from 'winston';

import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { LicenseModule } from './modules/license/license.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { OtpModule } from './modules/otp/otp.module';
// import { PostModule } from './modules/post/post.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { TypeLicenseModule } from './modules/type-license/type-license.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MailerModule,
    TypeLicenseModule,
    LicenseModule,
    QuotesModule,
    OtpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      parser: I18nJsonParser,
      inject: [ApiConfigService],
    }),
    HealthCheckerModule,
    WinstonModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        format: format.combine(format.ms(), format.timestamp(), format.json(), format.metadata()),
        transports: [
          new transports.Console({
            level: 'debug',
            format: format.combine(format.json(), format.metadata()),
          }),
          //   new transports.File({
          //     dirname: path.join(__dirname, './../logs/debug/'),
          //     filename: 'debug.log',
          //     level: 'debug',
          //     maxsize: 500_000,
          //     maxFiles: 30,
          //   }),
          //   new transports.File({
          //     dirname: path.join(__dirname, './../logs/error/'),
          //     filename: 'error.log',
          //     level: 'error',
          //     maxsize: 500_000,
          //     maxFiles: 30,
          //   }),
          //   new transports.File({
          //     dirname: path.join(__dirname, './../logs/info/'),
          //     filename: 'info.log',
          //     maxsize: 500_000,
          //     level: 'info',
          //     maxFiles: 30,
          //   }),
          new transports.MongoDB({
            level: 'debug',
            db: configService.mongoConfig.uri,
            collection: 'logs-system',
            options: {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              poolSize: 10,
            },
            capped: true,
            cappedSize: 500_000,
            storeHost: true,
            dbName: 'quotes-logs',
            expireAfterSeconds: 7_889_400,
            label: 'quotes-service',
            cappedMax: 50,
            name: 'quotes-service',
          }),
        ],
        exceptionHandlers: [
          new transports.Console({
            format: format.combine(format.timestamp(), format.json(), format.metadata()),
          }),
          new transports.File({
            dirname: path.join(__dirname, './../logs/exceptions/'),
            filename: 'exceptions.log',
            maxsize: 500_000,
          }),
        ],
        exitOnError: false,
      }),
      inject: [ApiConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}

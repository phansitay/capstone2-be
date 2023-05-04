import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import configuration from './config';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { UploadModule } from './modules/upload/upload.module';

// import_module_here
import { BlogModule } from './modules/blog/blog.module';
import { BookDoctorModule } from './modules/book-doctor/book-doctor.module';
import { BmiKidModule } from './modules/bmi-kid/bmi-kid.module';
import { SuggestScheduleModule } from './modules/suggest-schedule/suggest-schedule.module';
import { BabyModule } from './modules/baby/baby.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('database.url'),
        entities:
          process.env.NODE_ENV !== 'production'
            ? [join(__dirname, '/entities/**', '*.{ts,js}')]
            : ['dist/entities/*.entity{.ts,.js}'],
        logging: true,
        synchronize: configService.get<boolean>('database.synDB'),
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    SharedModule,
    UploadModule,
    // CacheModule,
    BlogModule,
    BookDoctorModule,
    BmiKidModule,
    SuggestScheduleModule, 
    BabyModule
    // append_here
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

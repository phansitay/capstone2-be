import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Blog } from "../../entities";
import { BlogService } from "./blog.service";
import { AdminBlogController } from "./blog.controller.admin";
import { ClientBlogController } from "./blog.controller.client";

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogService],
  controllers: [AdminBlogController, ClientBlogController],
})
export class BlogModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuggestScheduleCategory } from "src/entities/suggest-schedule-category";
import { SuggestScheduleCategoryService } from "./suggest-schedule-category.service";
import { AdminSuggestScheduleCategoryController } from "./suggest-schedule-category.controller.admin";
import { ClientSuggestScheduleCategoryController } from "./suggest-schedule-category.controller.client";

@Module({
  imports: [TypeOrmModule.forFeature([SuggestScheduleCategory])],
  providers: [SuggestScheduleCategoryService],
  controllers: [AdminSuggestScheduleCategoryController, ClientSuggestScheduleCategoryController],
})
export class SuggestScheduleCategoryModule {}

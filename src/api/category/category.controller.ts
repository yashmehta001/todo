import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReqCreateCategory, ResGetCategory } from './dto';
import { Serialize } from 'src/core/serialize.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Serialize(ResGetCategory)
  @Get()
  async getCategory() {
    return this.categoryService.getCategory();
  }

  @Serialize()
  @Post()
  async createCategory(@Body() body: ReqCreateCategory) {
    return this.categoryService.createCategory(body);
  }

  @Serialize()
  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReqCreateCategory,
  ) {
    return this.categoryService.updateCategory(id, body);
  }

  @Serialize()
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}

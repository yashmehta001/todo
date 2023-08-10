import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { ReqCreateCategory } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategory() {
    const category = await this.categoryRepository.find();
    return category;
  }

  async createCategory(body: ReqCreateCategory) {
    const category = this.categoryRepository.create({
      name: body.name,
    });
    return this.categoryRepository.save(category);
  }

  async updateCategory(id: number, body: ReqCreateCategory) {
    const category = await this.categoryRepository.preload({
      id: id,
      name: body.name,
    });
    if (!category) throw new NotFoundException('Category Not Found');
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.preload({
      id: id,
      deletedAt: new Date(),
    });
    if (!category) throw new NotFoundException('Category Not Found');
    return this.categoryRepository.save(category);
  }
}

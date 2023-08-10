import { IsNumber, IsString, MaxLength } from 'class-validator';

export class ReqCreateTask {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsNumber()
  category: number;
}

import { IsString, MaxLength } from 'class-validator';

export class ReqCreateCategory {
  @IsString()
  @MaxLength(255)
  name: string;
}

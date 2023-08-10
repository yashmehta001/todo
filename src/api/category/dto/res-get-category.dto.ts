import { Expose } from 'class-transformer';

export class ResGetCategory {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

import { Expose } from 'class-transformer';

export class ResGetTask {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  category: number;
}

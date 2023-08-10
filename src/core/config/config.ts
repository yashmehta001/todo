import * as process from 'process';

export const configParser = () => {
  return {
    port: process.env.APP_PORT || 3000,
    database: {
      type: process.env.DATABASE_TYPE || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'todo',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE || true,
    },
  };
};

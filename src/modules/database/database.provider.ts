import { Sequelize } from 'sequelize-typescript';
import User from '../users/user.entity';
import { AppConfig } from '../../config';

export const databaseProvider = {
  provide: 'SequelizeInstance',
  useFactory: () => {
    const sequelize = new Sequelize({
      database: AppConfig.database.database,
      dialect: 'mysql',
      username: AppConfig.database.username,
      password: AppConfig.database.password,
      modelPaths: [__dirname + '/../**/*.entity.ts'],
      operatorsAliases: false,
    });
    return sequelize;
  },
};

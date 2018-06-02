import { Sequelize } from 'sequelize-typescript';
import User from '../users/user.entity';
export const databaseProvider = {
  provide: 'SequelizeInstance',
  useFactory: () => {
    const sequelize = new Sequelize({
      database: 'togetherlists',
      dialect: 'mysql',
      username: 'root',
      password: '',
      modelPaths: [__dirname + '/../**/*.entity.ts'],
      operatorsAliases: false,
    });
    return sequelize;
  },
};

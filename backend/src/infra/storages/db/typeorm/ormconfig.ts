import { TypeORMUser } from './models/users';
import { TypeORMAdmin } from './models/admins';
import { DataSource } from 'typeorm';
import { AdminMigration1692373281324 } from './migrations/1692373281324-admin-migration';
import * as dotenv from "dotenv";

dotenv.config()
export default new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: [TypeORMUser, TypeORMAdmin],
  synchronize: false,
  migrations: [AdminMigration1692373281324],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: process.env.NODE_ENV === 'development' ? true : false
})


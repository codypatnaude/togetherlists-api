import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import ListDetail from './list-detail.entity';

@Table({
  timestamps: true,
})
export default class ListHeader extends Model<ListHeader> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  user_id: number;

  @CreatedAt created_at: Date;

  @UpdatedAt modified_at: Date;

  @HasMany(() => ListDetail)
  list_details: ListDetail[];
}

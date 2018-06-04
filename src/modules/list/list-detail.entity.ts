import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class ListDetail extends Model<ListDetail> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  list_header_id: number;

  @AllowNull(false)
  @Column
  text: string;

  @Column
  complete: number;

  @CreatedAt created_at: Date;

  @UpdatedAt modified_at: Date;
}

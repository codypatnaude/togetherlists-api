import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import ListHeader from './list-header.entity';

@Table({
  timestamps: true,
})
export default class ListDetail extends Model<ListDetail> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => ListHeader)
  @Column
  list_header_id: number;

  @AllowNull(false)
  @Column
  text: string;

  @Column
  complete: number;

  @CreatedAt created_at: Date;

  @UpdatedAt modified_at: Date;

  @BelongsTo(() => ListHeader)
  list: ListHeader;
}

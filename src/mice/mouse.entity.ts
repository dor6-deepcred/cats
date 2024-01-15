import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Cat } from '../cats/cat.entity';

@Table({
  tableName: 'mice',
  underscored: true,
  indexes: [
    {
      name: 'name',
      fields: ['name'],
    },
  ],
})
export class Mouse extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  image?: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @ForeignKey(() => Cat)
  @Column
  catId: number;

  @BelongsTo(() => Cat)
  cat: Cat;
}

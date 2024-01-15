import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Mouse } from '../mice/mouse.entity';

// COMMENT: you should do a base model for the id, created at, deleted at

@Table({
  tableName: 'cats',
  underscored: true,
  indexes: [
    {
      name: 'firstName',
      fields: ['first_name'],
    },
    {
      name: 'lastName',
      fields: ['last_name'],
    },
  ],
})
export class Cat extends Model {
  // COMMENT: better to use uuid and not id, performance is not what it was in the good old days
  //          and it saves you the security need to hide the id because numeric id may cause security risks
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
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  image?: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasMany(() => {
    // COMMENT: there must be a better solution
    // Workaround to avoid circular dependency with Mouse.entity
    const { Mouse } = require('../mice/mouse.entity');
    return Mouse;
  })
  mice: Mouse[];
}

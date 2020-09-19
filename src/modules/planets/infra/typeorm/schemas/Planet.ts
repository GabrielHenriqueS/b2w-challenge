import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('planets')
export default class Planet {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  climate: string;

  @Column()
  terrain: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

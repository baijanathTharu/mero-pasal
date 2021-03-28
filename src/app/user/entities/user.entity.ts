import { Shop } from 'src/app/shop/entities/shop.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  service_id: string;

  @OneToMany((type) => Shop, (shop) => shop.user, { eager: true })
  shops: Shop[];
}

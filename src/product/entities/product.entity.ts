import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum state {
  MAUVAIS = 'mauvais',
  BON = 'bon',
  ABIME = 'abime',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId!: string; 

  @Column()
  design!: string;

  @Column({type: 'enum', enum: state})
  state!: state;

  @Column()
  quantity!: number;

}

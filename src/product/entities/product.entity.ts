import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum state {
  MAUVAIS = 'mauvais',
  BON = 'bon',
  ABIME = 'abime',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId!: number; 

  @Column()
  design!: string;

  @Column({type: 'enum', enum: state})
  state!: state;

  @Column()
  quantity!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt!: Date;

}

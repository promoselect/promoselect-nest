import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oc_product',
})
export class Product {
  @PrimaryGeneratedColumn({
    name: 'product_id',
  })
  id: number;
  @Column({
    name: 'model',
  })
  model: string;
  @Column({
    name: 'sku',
  })
  sku: string;
  @Column({
    name: 'type',
  })
  type: string;
}

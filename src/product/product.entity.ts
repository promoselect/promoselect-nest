import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Attribute } from 'src/attribute/attribute.entity';
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
    name: 'status',
  })
  status: number;

  @OneToMany(type => Attribute, attribute => attribute.product)
  attribute: Attribute[];
}

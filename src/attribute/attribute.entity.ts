import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/product/product.entity';
@Entity({
  name: 'oc_attribute',
})
export class Attribute {
  @PrimaryGeneratedColumn({
    name: 'attribute_id',
  })
  id: number;

  @Column()
  attribute_group_id: number;

  @ManyToOne(type => Product, product => product.attribute)
  product: Product;

}
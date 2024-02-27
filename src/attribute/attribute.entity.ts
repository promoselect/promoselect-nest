import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
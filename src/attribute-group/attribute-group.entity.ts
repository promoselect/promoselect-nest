import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oc_attribute_group',
})
export class AttributeGroup {
  @PrimaryGeneratedColumn({
    name: 'attribute_group_id',
  })
  id: number;

  @Column()
  sort_order: number;
}

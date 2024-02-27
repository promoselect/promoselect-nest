import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oc_attribute_group_description',
})
export class AttributeGroupDescription {
  @PrimaryGeneratedColumn({
    name: 'attribute_group_id',
  })
  id: number;

  @Column()
  language_id: number;

  @Column()
  name: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oc_attribute_description',
})
export class AttributeDescription {
  @PrimaryGeneratedColumn({
    name: 'attribute_id',
  })
  id: number;

  @Column()
  language_id: number;

  @Column()
  name: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oc_product_attribute',
})
export class ProductAttribute {
    @PrimaryGeneratedColumn({
        name: 'product_id',
    })
    id: number;    

    @Column()
    attribute_id: number;

    @Column()
    language_id: number;

    @Column()
    text: string;
}   

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oc_color_info',
})
export class Color {
  @PrimaryGeneratedColumn({
    name: 'color_info_id',
  })
  id: number;

  @Column()
  name: string;

  @Column()
  hex: string;

  @Column()
  image: string;
}

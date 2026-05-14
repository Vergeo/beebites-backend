import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";
import { Menu } from "../../menu/entities/menu.entity";

@Entity("carts")
export class Cart {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	cartId: number;

	@ApiProperty()
	@Column()
	userId: number;

	@ApiProperty()
	@Column()
	menuId: number;

	@ApiProperty()
	@Column({ type: "integer", default: 1 })
	quantity: number;

	@ApiProperty()
	@Column({ type: "varchar", length: 500, nullable: true })
	notes: string;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user: User;

	@ManyToOne(() => Menu, { eager: true, onDelete: "CASCADE" })
	@JoinColumn({ name: "menuId" })
	menu: Menu;
}

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export enum UserRole {
	CUSTOMER = "customer",
	ADMIN = "admin",
	TENANT = "tenant",
}

@Entity("users")
export class User {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	userId: number;

	@ApiProperty()
	@Column({ type: "varchar", length: 500 })
	name: string;

	@ApiProperty()
	@Column({ type: "varchar", length: 500, unique: true })
	email: string;

	@Exclude()
	@Column({ type: "varchar", length: 500 })
	password: string;

	@ApiProperty()
	@Column({ type: "varchar", length: 500, default: UserRole.CUSTOMER })
	role: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

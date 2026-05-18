import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";
import { Tenant } from "src/tenants/entities/tenant.entity";

export enum PaymentStatus {
	PENDING = "pending",
	PROCESSING = "processing",
	COMPLETED = "completed",
	CANCELLED = "cancelled",
}

@Entity("payments")
export class Payment {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	paymentId: number;

	@ApiProperty()
	@Column()
	userId: number;

	@ApiProperty()
	@Column()
	tenantId: number;

	@ApiProperty()
	@Column({ type: "varchar", length: 500 })
	paymentType: string;

	@ApiProperty()
	@Column({ type: "varchar", length: 500, default: PaymentStatus.PENDING })
	status: string;

	@ApiProperty()
	@Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
	totalPrice: number;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user: User;

	@ManyToOne(() => Tenant, { eager: true, onDelete: "CASCADE" })
	@JoinColumn({ name: "tenantId" })
	tenant: Tenant;
}

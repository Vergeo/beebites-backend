import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { TenantsService } from '../tenants/tenants.service';
import { MenuService } from '../menu/menu.service';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly tenantsService: TenantsService,
    private readonly menuService: MenuService,
    private readonly ordersService: OrdersService,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(customerId: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { customerId } });
    if (!customer) throw new NotFoundException(`Customer #${customerId} not found`);
    return customer;
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(dto);
    return this.customerRepository.save(customer);
  }

  async update(customerId: number, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(customerId);
    Object.assign(customer, dto);
    return this.customerRepository.save(customer);
  }

  async remove(customerId: number): Promise<void> {
    const customer = await this.findOne(customerId);
    await this.customerRepository.remove(customer);
  }

  async viewTenants() {
    return this.tenantsService.getAllTenants();
  }

  async viewMenu(tenantId: number) {
    return this.menuService.getMenuByTenant(tenantId);
  }

  async viewOrders(customerId: number) {
    return this.ordersService.getOrdersByCustomer(customerId);
  }

  async viewOrderHistory(customerId: number) {
    return this.ordersService.getOrderHistory(customerId);
  }

  async trackOrder(orderId: number) {
    return this.ordersService.trackOrder(orderId);
  }
}

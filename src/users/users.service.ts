import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException(`User #${userId} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.findByEmail(createUserDto.email);
    if (existing) throw new ConflictException('Email already in use');
    const hashed = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashed });
    return this.userRepository.save(user);
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(userId: number): Promise<void> {
    const user = await this.findOne(userId);
    await this.userRepository.remove(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}

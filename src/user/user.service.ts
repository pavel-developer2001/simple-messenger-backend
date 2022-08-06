import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  async create(registerUserDto: RegisterUserDto) {
    const findUser = await this.repository.findOne({
      where: { name: registerUserDto.name },
    });
    if (findUser) {
      throw new HttpException(
        'Пользователь с таким именем уже создан',
        HttpStatus.FORBIDDEN,
      );
    }
    const hashPassword = await bcrypt.hash(registerUserDto.password, 5);
    const user = await this.repository.save({
      name: registerUserDto.name,
      password: hashPassword,
    });
    const { password, ...userData } = user;
    return userData;
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.repository.findOne({
        where: { _id: id },
      });
      if (!user) {
        throw new HttpException(
          'Пользователь с таким id не найден',
          HttpStatus.NOT_FOUND,
        );
      }

      return { name: user.name };
    } catch (error) {
      console.error(error);
    }
  }
  async findById(id: number) {
    try {
      const user = await this.repository.findOne({ where: { _id: id } });
      return user;
    } catch (error) {
      console.error(error);
    }
  }
  async findUser(loginUserDto: LoginUserDto) {
    const user = await this.repository.findOne({
      where: { name: loginUserDto.name },
    });
    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не найден!',
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new HttpException('Неверный пароль', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUser(id: number) {
    const user = await this.repository.findOne({ where: { _id: id } });
    const { password, ...userData } = user;
    return userData;
  }
}

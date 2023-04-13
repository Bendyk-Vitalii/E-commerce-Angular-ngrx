import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto, RefreshTokenDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { User } from '../user.entity';

interface responseT {
  access_token: string;
}

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<responseT | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });
    return {
      access_token: this.helper.generateToken(user, "access"),
    };
  }

  // public refresh(user: User): string {
  //   this.repository.update(user.id, { lastLoginAt: new Date() });

  //   return this.helper.generateToken(user, 'refresh');
  // }
  public async refresh(refreshDto: RefreshTokenDto): Promise<string> {
    const user: User = await this.repository.findOne({
      where: { id: refreshDto.userId }
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.helper.validateRefreshToken(refreshDto.refreshToken, user);

    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user, 'refresh');
  }


}

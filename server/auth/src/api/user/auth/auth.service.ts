import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
      access_token: this.helper.generateToken(user, 'access')
    };
  }

  public async refresh(refreshTokenDto: RefreshTokenDto): Promise<string> {
    const refreshToken = refreshTokenDto.refreshToken;
    const userId = refreshTokenDto.userId;

    // check if the refresh token is valid and get the corresponding user
    const user = await this.helper.validate(refreshToken);

    // check if the user ID matches the ID in the refresh token
    if (user.id !== userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // generate new access and refresh tokens
    const accessToken = this.helper.generateToken(user, 'access');
    const newRefreshToken = this.helper.generateToken(user, 'refresh');

    // update the user's last login timestamp in the database
    await this.repository.update(user.id, { lastLoginAt: new Date() });

    // return the new refresh token
    return newRefreshToken;
      access_token: this.helper.generateToken(user, "access"),
    };
  }

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

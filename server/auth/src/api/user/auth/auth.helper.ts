import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../user.entity';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  private readonly secretKey: string = process.env.JWT_KEY;
  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne(decoded.id);
  }

  // Generate JWT Token
  public generateToken(user: User, type: 'access' | 'refresh'): string {
    const payload: JwtPayload = { sub: user.id + '' };
    const expiresIn = type === 'access' ? '15m' : '7d'; // change the expiration time based on the token type
    return this.jwt.sign(payload, { expiresIn, secret: this.secretKey });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }

  public async validateRefreshToken(refreshToken: string, user: User): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(refreshToken);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { User } from '@/api/user/user.entity';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './auth.dto';

interface responseT {
  access_token: string;
}

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<responseT | never> {
    return this.service.login(body);
  }

@Post('refresh')
private async refresh(@Body() refreshDto: RefreshTokenDto, @Res() res: Response): Promise<string | never> {
  const token = await this.service.refresh(refreshDto);
  res.cookie('refresh_token', token, { httpOnly: true });
  return token;
}
}

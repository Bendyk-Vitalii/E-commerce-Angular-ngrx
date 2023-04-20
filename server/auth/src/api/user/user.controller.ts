import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../user/auth/auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateNameDto } from './user.dto';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Put('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(@Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
    return this.service.updateName(body, req);
  }
}

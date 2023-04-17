import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';

import { AuthService } from '../src/api/user/auth/auth.service';
import { User } from '../src/api/user/user.entity';
import { AppModule } from '../src/app.module';
import { RefreshTokenDto } from '../src/api/user/auth/auth.dto';

describe('RefreshController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let authService: AuthService;
  jest.setTimeout(30000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = app.get<JwtService>(JwtService);
    authService = app.get<AuthService>(AuthService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/refresh', () => {
    it('should return a new access token and refresh token', async () => {
      // create a new user
      const userData = {
        name: 'testuser',
        email: 'test@mail.com',
        password: 'testpass',
      };
      const user = await authService.register(userData);

      // create a refresh token for the user
      const refreshDto = new RefreshTokenDto();
      refreshDto.userId = user.id;
      const refreshToken = await authService.refresh(refreshDto);

      // send a request to refresh the access token using the refresh token
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken: refreshToken,
        })
        .expect(200);

      // assert that the response contains a new access token and refresh token
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');

      // verify the new access token
      const decodedAccessToken = jwtService.decode(
        response.body.accessToken,
      ) as Partial<User>;

      expect(decodedAccessToken).toHaveProperty('sub', user.id);
      expect(decodedAccessToken).toHaveProperty('username', user.name);

      const newRefreshToken = await authService.refresh(refreshDto);
      expect(newRefreshToken).toBeDefined();
    });
  });
});

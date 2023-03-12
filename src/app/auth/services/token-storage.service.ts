import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private accessTokenKey!: string;
  private refreshTokenKey!: string;

  constructor(
    private localStorageService: LocalStorageService,
    private configService: ConfigService
  ) {
    const authSettings = this.configService.getAuthSettings();
    this.accessTokenKey = authSettings.accessTokenKey || 'accessToken';
    this.refreshTokenKey = authSettings.refreshTokenKey || 'refreshToken';
  }

  getAccessToken(): string {
    return this.localStorageService.getItem(this.accessTokenKey) as string;
  }

  saveAccessToken(token: string) {
    this.localStorageService.setItem(this.accessTokenKey, token);
  }

  getRefreshToken(): string {
    return this.localStorageService.getItem(this.refreshTokenKey) as string;
  }

  saveRefreshToken(token: string) {
    this.localStorageService.setItem(this.refreshTokenKey, token);
  }

  saveTokens(accessToken: string) {
    this.saveAccessToken(accessToken);
    //this.saveRefreshToken(refreshToken);
  }

  removeTokens() {
    this.localStorageService.removeItem('userData');
    this.localStorageService.removeItem(this.accessTokenKey);
    this.localStorageService.removeItem(this.refreshTokenKey);
  }
}
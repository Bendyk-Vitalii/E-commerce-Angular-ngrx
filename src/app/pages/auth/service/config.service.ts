import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



type AppEnv = typeof environment;

@Injectable({ providedIn: 'root' })
export class ConfigService {
  /**
   * Returns environment config of application
   */
  getEnvironment(): AppEnv {
    return environment;
  }

  /**
   * Indicates whether the apps is running in production mode
   *
   * @return {*}  {boolean}
   */
  isProd(): boolean {
    return environment.production;
  }

  /**
   * Returns app's version
   */
  getVersion(): string {
    return environment.appVersion;
  }

  /**
   * Returns the server's host url
   */
  getAuthAPIUrl(): string {
    return environment?.authApiUrl;
  }

  getFakeStoreAPIUrl(): string {
    return environment?.fakeStoreApiUrl;
  }

  /**
   * Returns configuration for auth client and secret
   */
  getAuthSettings(): AppEnv['settings']['auth'] {
    return environment?.settings?.auth;
  }
}

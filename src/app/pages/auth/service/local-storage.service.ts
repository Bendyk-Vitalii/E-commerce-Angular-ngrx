import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  static readonly APP_PREFIX = 'AMAZ-SHOP-ACCESS-TOKEN';

  /**
   * Sets item in local storage
   *
   * @param {string} key
   * @param {unknown} value
   */
  setItem(key: string, value: unknown) {
    try {
      localStorage.setItem(
        LocalStorageService.APP_PREFIX,
        JSON.stringify(value)
      );
    } catch (e) {
      localStorage.setItem(LocalStorageService.APP_PREFIX, value as string);
    }
  }

  /**
   * Gets item from local storage by key
   *
   * @param {string} key
   * @return {*}  {unknown}
   */
  getItem(key: string): unknown {
    const value = localStorage.getItem(`${LocalStorageService.APP_PREFIX}${key}`);
    try {
      return JSON.parse(value as string);
    } catch (e) {
      return value;
    }
  }

  /**
   * Removes item from local storage by key
   *
   * @param {string} key
   */
  removeItem(key: string) {
    localStorage.removeItem(`${LocalStorageService.APP_PREFIX}${key}`);
  }
}

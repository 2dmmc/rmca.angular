import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class StorageService {
  constructor(private sessionStorageService: SessionStorageService,
              private localStorageService: LocalStorageService) {
  }

  public sessionStorageSetValue(key, value): void {
    this.sessionStorageService.store(key, value);
  }

  public sessionStorageGetValue(value): any {
    return this.sessionStorageService.retrieve(value);
  }

  public sessionStorageDeleteValue(key): void {
    this.sessionStorageService.clear(key);
  }

  public localStorageSetValue(key, value): void {
    this.localStorageService.store(key, value);
  }

  public localStorageGetValue(value): any {
    return this.localStorageService.retrieve(value);
  }

  public localStorageDeleteValue(key): void {
    this.localStorageService.clear(key);
  }
}

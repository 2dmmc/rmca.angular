import {Injectable} from '@angular/core';
import {StorageService} from '../../storage/storage.service';
import {User} from '../../../@model/user/user.interface';

@Injectable()
export class UserCacheService {
  constructor(private storageService: StorageService) {
  }

  public setCache(user: User): void {
    this.storageService.sessionStorageSetValue('user', user);
  }

  public getCache(): User {
    return this.storageService.sessionStorageGetValue('user') as User;
  }

  public deleteUser(): void {
    this.storageService.sessionStorageDeleteValue('user');
  }
}

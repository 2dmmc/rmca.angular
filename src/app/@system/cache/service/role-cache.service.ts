import {Injectable} from '@angular/core';
import {StorageService} from '../../storage/storage.service';
import {Role} from '../../../@model/player/role/role.interface';

@Injectable()
export class RoleCacheService {
  constructor(private storageService: StorageService) {
  }

  public setCache(roleId: number, role: Role): void {
    this.storageService.sessionStorageSetValue(`role-${roleId}`, role);
  }

  public getCache(roleId: number): Role {
    return this.storageService.sessionStorageGetValue(`role-${roleId}`) as Role;
  }

  public deleteUser(roleId: number): void {
    this.storageService.sessionStorageDeleteValue(`role-${roleId}`);
  }
}

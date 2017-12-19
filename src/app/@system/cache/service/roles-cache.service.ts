import {Injectable} from '@angular/core';
import {StorageService} from '../../storage/storage.service';
import {Role} from '../../../@model/role.model';

@Injectable()
export class RolesCacheService {
  constructor(private storageService: StorageService) {
  }

  public setCache(roles: Role[]): void {
    this.storageService.sessionStorageSetValue('roles', roles);
  }

  public getCache(): Role[] {
    return this.storageService.sessionStorageGetValue('roles') as Role[];
  }

  public deleteUser(): void {
    this.storageService.sessionStorageDeleteValue('roles');
  }
}

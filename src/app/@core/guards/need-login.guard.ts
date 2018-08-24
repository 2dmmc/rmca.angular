import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {UserService} from '../data/user.service';
import {AuthUtilService} from '../utils/auth-util.service';
import {NoticeService} from '../services/notice.service';
import {StorageService} from '../services/storage.service';

@Injectable()
export class NeedLoginGuard implements CanActivate {
  constructor(private router: Router,
              private authUtilService: AuthUtilService,
              private userService: UserService,
              private noticeService: NoticeService,
              private storageService: StorageService) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const loginState = await this.authUtilService.isUserAuthenticated();
      this.authUtilService.user = await this.userService.getUserProfile();

      if (loginState.impersonate) {
        this.noticeService.warning('替身模式装弹成功!', `当前正处于替身模式, 替身用户为${loginState.username}`);
      } else {
        this.noticeService.info('不要变成发抖的小喵喵', '|･ω･｀)');
      }

      return true;
    } catch (error) {
      switch (error.status) {
        case 401: {
          this.noticeService.warning('Auth Router Guard (needLogin)', '你还未登录');
          break;
        }
        default: {
          this.noticeService.error('[NeedLoginGuard] canActivate', '未知错误');
          console.error(error);
        }
      }
      this.storageService.sessionStorageSetValue('next', state.url);
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

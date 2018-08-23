import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthUtilService} from '../utils/auth-util.service';
import {NoticeService} from '../services/notice.service';

@Injectable()
export class NeedLoginService implements CanActivate {
  constructor(private router: Router,
              private authUtilService: AuthUtilService,
              private noticeService: NoticeService) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const loginState = await this.authUtilService.isUserAuthenticated();

      if (loginState.impersonate) {
        this.noticeService.warning('替身模式装弹成功!', `当前正处于替身模式, 替身用户为${loginState.username}`);
      } else {
        this.noticeService.info('不要变成发抖的小喵喵', '|･ω･｀)');
      }

      return true;
    } catch (error) {
      switch (error.status) {
        case 401: {
          this.noticeService.warning('Auth Router Guard (needLogin)', '你还未登陆');
          this.router.navigate(['/auth/login']);
          break;
        }
        default: {
          this.noticeService.error('[NeedLoginGuard] canActivate', error);
        }
      }

      return false;
    }
  }
}

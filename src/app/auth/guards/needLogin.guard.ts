import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthUtilService} from '../services/auth-util.service';
import {NoticeService} from '../../@system/notice/notice.service';

@Injectable()
export class NeedLoginGuard implements CanActivate {
  constructor(private router: Router,
              private authUtilService: AuthUtilService,
              private noticeService: NoticeService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authUtilService.isUserAuthenticated()
      .then(isLogin => {
        if (isLogin['impersonate']) {
          this.noticeService.warning('替身模式装弹成功!', `当前正处于替身模式, 替身用户为${isLogin['username']}`);
        } else {
          this.noticeService.info('不要变成发抖的小喵喵', '|･ω･｀)');
        }
        return true;
      })
      .catch(notLogin => {
        this.noticeService.warning('Auth Router Guard (needLogin)', '请先登录');
        this.router.navigate(['/auth/login']);
        return false;
      });
  }
}

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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authUtilService.isUserAuthenticated()
        .then(isLogin => {
          this.noticeService.success('不要变成发抖的小喵喵', '|･ω･｀)');
          resolve(isLogin);
        })
        .catch(notLogin => {
          this.noticeService.error('authentication failed', '请先登录');
          this.router.navigate(['/auth/login']);
          reject(notLogin);
        });
    });
  }
}

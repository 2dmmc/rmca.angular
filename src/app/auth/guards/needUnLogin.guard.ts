import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthUtilService} from '../services/auth-util.service';
import {NoticeService} from '../../@system/notice/notice.service';

@Injectable()
export class NeedUnLoginGuard implements CanActivate {
  constructor(private router: Router,
              private authUtilService: AuthUtilService,
              private noticeService: NoticeService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authUtilService.isUserAuthenticated()
        .then(isLogin => {
          this.noticeService.warning('Auth Router Guard (needUnLogin)', '你已经登录了');
          this.router.navigate(['/pages/dashboard']);
          return reject(isLogin);
        })
        .catch(notLogin => {
          return resolve(notLogin);
        });
    });
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {NoticeService} from '../../@system/notice/notice.service';
import {AuthUtilService} from '../services/auth-util.service';

@Injectable()
export class NeedAdminGuard implements CanActivate {
  constructor(private router: Router,
              private authUtilService: AuthUtilService,
              private noticeService: NoticeService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authUtilService.isAdmin()
      .then(isAdmin => {
        return isAdmin;
      })
      .catch(notAdmin => {
        this.noticeService.warning('Auth Router Guard (needAdmin)', '你又不是鹳狸猿');
        this.router.navigate(['/pages/dashboard']);
        return notAdmin;
      });
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {NoticeService} from '../../@core/services/notice.service';
import {AuthUtilService} from '../services/auth-util.service';

@Injectable()
export class NeedAdminGuard implements CanActivate {
  constructor(private router: Router,
              private authUtilService: AuthUtilService,
              private noticeService: NoticeService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authUtilService.isAdmin()) {
      return true;
    } else {
      this.noticeService.warning('Auth Router Guard (needAdmin)', '你又不是鹳狸猿');
      this.router.navigate(['/pages/dashboard']);
      return false;
    }
  }
}

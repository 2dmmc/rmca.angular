import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {CallbackService} from './callback.service';
import {UserService} from '../../pages/user/user.service';

@Injectable()
export class CallbackUtilService {
  constructor(private http: HttpClient,
              private authService: CallbackService,
              private userService: UserService) {
  }
}

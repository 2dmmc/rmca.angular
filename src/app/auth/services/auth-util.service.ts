import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {AuthService} from './auth.service';
import {UserService} from '../../pages/user/user.service';

@Injectable()
export class AuthUtilService {
  constructor(private http: HttpClient,
              private authService: AuthService,
              private userService: UserService) {
  }

  isUserAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getLoginState()
        .then(user => {
          if (user) {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch(error => {
          console.error(error);
          reject(false);
        });
    });
  }

  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        this.userService.getUserProfile()
          .then(user => {
            if (user['admin']) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch(error => {
            console.error(error);
            reject(false);
          });
      },
    );
  }

  isDeveloper(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getUserProfile()
        .then(user => {
          if (user['username'] === 'sdjnmxd' || user['username'] === 'bangbang93') {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch(error => {
          console.error(error);
          reject(false);
        });
    });
  }
}

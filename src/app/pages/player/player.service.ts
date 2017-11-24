import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {
  }

  getPlayers() {
    return this.http.get('/api/role')
      .toPromise();
  }

  createPlayer(playerName) {
    const params = new HttpParams()
      .set('rolename', playerName);

    return this.http.post('/api/role', params)
      .toPromise();
  }

  getPlayerSkin(playerId) {
    return this.http.get(`/api/role/skin/${playerId}`)
      .toPromise();
  }

  setPlayerSkin(playerId, file) {
    const params = new HttpParams()
      .set('file', file);

    return this.http.post(`/api/role/skin/${playerId}`, params)
      .toPromise();
  }

  setPlayerDefault(playerId) {
    const params = new HttpParams()
      .set('roleId', playerId);

    return this.http.patch('/api/role/default', params)
      .toPromise();
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  getFinanceHistories(page): Promise<object> {
    const params = new HttpParams()
      .set('page', page);

    return this.http.get('/api/finance', {params: params})
      .toPromise();
  }
}

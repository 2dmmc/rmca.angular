import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  // TODO 补充文档
  public getFinanceHistories(page, limit): Promise<object> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get('/api/finance', {params: params})
      .toPromise();
  }
}

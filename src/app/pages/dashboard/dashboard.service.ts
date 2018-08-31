import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {IFinanceResponse} from '../../@model/common/admin/fmc/finacne/finance.interface';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  // TODO 补充文档
  public getFinanceHistories(page: number, limit: number): Promise<object> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString() || '10');

    return this.http.get('/api/finance', {params: params})
      .toPromise();
  }

  public getFinanceHistory(financeId: string): Promise<IFinanceResponse> {
    return this.http.get<IFinanceResponse>(`/api/finance/${financeId}`)
      .toPromise();
  }
}

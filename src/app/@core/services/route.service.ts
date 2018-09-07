import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class RouteService {
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  private queryMap = {};

  public addQuery(queryMap: object): Promise<boolean> {
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: Object.assign(this.queryMap, queryMap),
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  public removeQuery(queryName: string): Promise<boolean> {
    this.queryMap[queryName] = null;

    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryMap,
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  public getQuery(queryName: string): Promise<string> {
    return new Promise((resolve) => {
      this.activatedRoute.queryParams.subscribe(params => {
        return resolve(params[queryName] || '');
      });
    });
  }
}

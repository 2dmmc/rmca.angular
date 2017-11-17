import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Injectable()
export class StateService {

  protected layouts: any = [
    {
      name: '单列',
      icon: 'nb-layout-default',
      id: 'one-column',
      selected: true,
    },
    {
      name: '双列',
      icon: 'nb-layout-two-column',
      id: 'two-column',
    },
    {
      name: '居中',
      icon: 'nb-layout-centre',
      id: 'center-column',
    },
  ];
  protected layoutState$ = new BehaviorSubject(this.layouts[0]);
  protected sidebars: any = [
    {
      name: '左侧侧边栏',
      icon: 'nb-layout-sidebar-left',
      id: 'left',
      selected: true,
    },
    {
      name: '右侧侧边栏',
      icon: 'nb-layout-sidebar-right',
      id: 'right',
    },
  ];
  protected sidebarState$ = new BehaviorSubject(this.sidebars[0]);

  setLayoutState(state: any): any {
    this.layoutState$.next(state);
  }

  getLayoutStates(): Observable<any[]> {
    return Observable.of(this.layouts);
  }

  onLayoutState(): Observable<any> {
    return this.layoutState$.asObservable();
  }

  setSidebarState(state: any): any {
    this.sidebarState$.next(state);
  }

  getSidebarStates(): Observable<any[]> {
    return Observable.of(this.sidebars);
  }

  onSidebarState(): Observable<any> {
    return this.sidebarState$.asObservable();
  }
}

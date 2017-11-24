import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./yggdrasil.component.scss'],
  templateUrl: './yggdrasil.component.html',
})
export class YggdrasilComponent implements OnInit {

  yggdrasil: any = {};
  submitted: boolean;

  ngOnInit() {
    this.yggdrasil = {
      username: '',
      password: '',
    };
  }

  isSubmitted(): boolean {
    return this.submitted;
  }
}

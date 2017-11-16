import {Component} from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://mxd.moe" target="_blank">Icefox</a></b> 2017</span>
    <div class="socials">
      <a href="https://weibo.com/sdjnmxd" target="_blank" class="fa fa-weibo"></a>
    </div>
  `,
})
export class FooterComponent {
}

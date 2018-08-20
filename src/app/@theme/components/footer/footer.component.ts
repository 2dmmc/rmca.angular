import {Component} from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with
      <b><a href="https://akveo.github.io/nebular" target="_blank">Nebular</a></b>
      by
      <b><a href="https://weibo.com/sdjnmxd" target="_blank">Icefox</a></b>
      &
      <b><a href="https://blog.bangbang93.com" target="_blank">Bangbang93</a></b>.
      <b>RMCA 2.0</b>
    </span>
    <div class="socials">
      <a href="https://weibo.com/forgecraft" target="_blank" class="fa fa-weibo"></a>
      <a href="http://shang.qq.com/wpa/qunwpa?idkey=af32f473d2ce7f16e35a1a971f732866f6eed67db363430c4f793c9cfb8d2768"
         target="_blank" class="fa fa-qq"></a>
    </div>
  `,
})
export class FooterComponent {
}

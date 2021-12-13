import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fronted-edufree-g26-e3';
  openSideBar = true;

  constructor(){

  }

  togleSideBar(): void {
    this.openSideBar = !this.openSideBar;
  }
}

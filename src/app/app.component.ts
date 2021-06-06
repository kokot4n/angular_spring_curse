import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  login(l: boolean){
    this.isLoggedIn = l;
  }
  logout(){
    this.isLoggedIn = false;
  }
}

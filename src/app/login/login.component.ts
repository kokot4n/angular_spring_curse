import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  isLoggedIn = false;
  @Output() logInEvent = new EventEmitter<boolean>();

  login(){
    var formData = new FormData();
    formData.append("username",this.username);
    formData.append("password", this.password);
    this.httpClient.post("https://spring-curse-job.herokuapp.com/login",formData, {withCredentials: true}).subscribe((notes: any) => {
      this.isLoggedIn = true;
      this.logInEvent.emit(this.isLoggedIn);
    }, err => {
      alert("Неверные данные");
    });
  }

  reg(){
    this.httpClient.post("https://spring-curse-job.herokuapp.com/user", 
    {"login": this.username, "password": this.password, "roles": "ADMIN"}, 
    {withCredentials: true}).subscribe((user: any) => {
      if(user.roles == "USER"){
        this.login();
      } else{
        alert("Такой пользователь уже существует");
      }
    }, err => {
      alert("reg");
    });
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get("https://spring-curse-job.herokuapp.com/user", {withCredentials: true}).subscribe((user: any) => {
      console.log(user);
      this.username = user.login;
      this.password = user.password;
      this.isLoggedIn = true;
      this.logInEvent.emit(this.isLoggedIn);
    }, err => {
      console.log("not logged in");
      
    });
  }

}

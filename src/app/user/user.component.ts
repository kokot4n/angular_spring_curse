import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  today = new Date();
  date = {
    "year": this.today.getFullYear(),
    "month": this.today.getMonth()+1,
    "day": this.today.getDate()
  }
  text = "";
  note = {
    "text": this.text,
    "date": this.date
  }
  @Output() logOutEvent = new EventEmitter<boolean>();

  logout(){
    this.httpClient.get("http://localhost:8080/logout", {withCredentials: true, }).subscribe((answer: any) =>{
      console.log(+answer);
      this.logOutEvent.emit();
    }, err => {
      this.logOutEvent.emit();
    });
  }

  newNote(){
    this.postNotes().subscribe((notes: any) => {
      alert("Новая заметка создана удачно. Обновние таблицу.");
    }, err => {
      alert("user notes");
    }
    );
  }

  postNotes(): Observable<any>{
    var dateString = this.date.year + '-';
    dateString += (this.date.month.toString().length<2) ? '0' : '';
    dateString += this.date.month + '-';
    dateString += (this.date.day.toString().length<2) ? '0' : '';
    dateString += this.date.day;
    let url = new URL('http://localhost:8080/user/note');
    let post = this.httpClient.post(url.toString(), {"text": this.text, "date": dateString}, {withCredentials: true, });
    console.log(post);
    
    return post;
  }
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  date = new Date("2021-01-01").toISOString().substr(0, 22);
  text = "";
  note = {
    "text": this.text,
    "date": this.date
  }

  newNote(){
    this.getNotes().subscribe((notes: any) => {
      console.log(notes);
    }, err => {
      alert("error");
    }
    );
  }

  getNotes(): Observable<any>{
    let url = new URL('https://spring-curse-job.herokuapp.com/user/note');
    let post = this.httpClient.post(url.toString(), {"text": this.text, "date": this.date});
    console.log(post);
    
    return post;
  }
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}

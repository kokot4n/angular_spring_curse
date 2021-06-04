import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }


  lat = 0;
  lng = 0;

  rows: any[] = [];
  columns = [{ prop: 'day' }, { name: 'temperature' }, { name: 'pressure' }, {name:'note'}];
  notes: any[] = [];

  getWeather(): Observable<any>{
    return this.httpClient.get<any>(
      'https://spring-curse-job.herokuapp.com/user/weather?lat='+this.lat+'&lon='+this.lng
    );
  }

  getNotes(): Observable<any>{
    let url = new URL('https://spring-curse-job.herokuapp.com/user/note');
    return this.httpClient.get<any>(
      url.toString()
    );
  }

  ngOnInit(): void {
    this.send();
    this.getUserLocation();
  }

  send(){
    this.rows = [];
    
    this.getWeather().subscribe((weather: any) => {
      this.getNotes().subscribe((notes: any) => {
        this.notes = notes;
        weather = weather.daily;
      for (let i = 0; i < weather.length; i++) {
        this.rows.push({day: new Date(weather[i].dt * 1000).toLocaleDateString(), temperature: weather[i].temp.eve, pressure: weather[i].pressure});
      }
      for (let i = 0; i < notes.length; i++) {
        for (let j = 0; j < weather.length; j++) {
          if(new Date(this.notes[i].date).getDate() == new Date(weather[j].dt * 1000).getDate()){
            this.rows[j].note = this.notes[i].text;
          }
        }
        
      }
      this.rows = [...this.rows];
      }, err => {
        alert("error");
      }
      );
    }, err => {
      alert("error");
    }
    );
  }

  getUserLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;
       });
    }else {
      console.log("User not allow")

    }
  }

 
}

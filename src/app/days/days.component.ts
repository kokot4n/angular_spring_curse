import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  notes: any[] = [];

  @ViewChild('myTable') table: any;

  getWeather(): Observable<any>{
    return this.httpClient.get<any>(
      'http://localhost:8080/user/weather?lat='+this.lat+'&lon='+this.lng, {withCredentials: true}
    );
  }

  getNotes(): Observable<any>{
    this.getUserLocation();
    let url = new URL('http://localhost:8080/user/note');
    return this.httpClient.get<any>(
      url.toString(), {withCredentials: true}
    );
  }

  ngOnInit(): void {
    this.getUserLocation();
  }

  send(){
    this.getWeather().subscribe((weather: any) => {
      this.getNotes().subscribe((notes: any) => {
        this.rows = [];
        this.notes = notes;
        weather = JSON.parse(weather.body).daily;
      for (let i = 0; i < weather.length; i++) {
        this.rows.push({day: new Date(weather[i].dt * 1000).toLocaleDateString(), temperature: weather[i].temp.eve, pressure: weather[i].pressure});
        this.rows[i].note = [];
      }
      for (let i = 0; i < notes.length; i++) {
        for (let j = 0; j < weather.length; j++) {
          if(new Date(this.notes[i].date).getDate() == new Date(weather[j].dt * 1000).getDate()){
            this.rows[j].note.push(this.notes[i].text);
          }
        }
        
      }
      this.rows = [...this.rows];
      
      }, err => {
        alert("notes");
      }
      );
    }, err => {
      alert("weather");
    }
    );
  }

  getUserLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;
       });
       this.send();
    }else {
      console.log("User not allow")

    }
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
    console.log(row);
    
  }

 
}

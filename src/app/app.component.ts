import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PapaParseService } from 'ngx-papaparse';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public http: HttpClient, private papa: PapaParseService) {}

  handleFileSelect(evt) {
    let file = evt.target.files[0];
    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(csvOrders) {
        console.log(csvOrders.data);
        this.http.post(environment.ordersUrl, {'order': csvOrders.data}).toPromise()
        .then((data)=>console.log(data));
      }
    });
  }


}

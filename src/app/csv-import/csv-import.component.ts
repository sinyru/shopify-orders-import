import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PapaParseService } from 'ngx-papaparse';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {

  constructor(public http: HttpClient, private papa: PapaParseService, private spinner: NgxSpinnerService, private router:Router) {}

  ngOnInit() {}

  handleFileSelect(evt) {
    this.spinner.show();
    let file = evt.target.files[0];
    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (csvOrders) => {
        let results = [];
        for(let i=0; i<csvOrders.data.length; i++) {
          results.push(csvOrders.data.filter((x)=> x["Export_NYC_Order_Number"] === csvOrders.data[i]["Export_NYC_Order_Number"]));
        }
        let unique = results.map((x) => {
          if (x.length > 1) {
            return {
                      "Export_NYC_Order_Number": x[0]["Export_NYC_Order_Number"],
                      "Export_NYC_Order_Date": x[0]["Export_NYC_Order_Date"],
                      "Export_NYC_Item_Quantity": x[0]["Export_NYC_Item_Quantity"],
                      "Export_NYC_Item_Number": x[0]["Export_NYC_Item_Number"],
                      "Export_NYC_Item_Description": x[0]["Export_NYC_Item_Description"],
                      "Export_NYC_Contact": x[0]["Export_NYC_Contact"],
                      "Export_NYC_Ship_Org": x[0]["Export_NYC_Ship_Org"],
                      "Export_NYC_Ship_Address": x[0]["Export_NYC_Ship_Address"],
                      "Export_NYC_Ship_City": x[0]["Export_NYC_Ship_City"],
                      "Export_NYC_Ship_State": x[0]["Export_NYC_Ship_State"],
                      "Export_NYC_Ship_Zip": x[0]["Export_NYC_Ship_Zip"],
                      "Export_NYC_Ship_Country": x[0]["Export_NYC_Ship_Country"],
                      "Export_NYC_Ship_Phone": x[0]["Export_NYC_Ship_Phone"],
                      "Export_NYC_Ship_Email": x[0]["Export_NYC_Ship_Email"],
                      "Export_NYC_Ship_Delivery_Instructions": x[0]["Export_NYC_Ship_Delivery_Instructions"],
                      "Export_NYC_Bill_Org": x[0]["Export_NYC_Bill_Org"],
                      "Export_NYC_Bill_Address": x[0]["Export_NYC_Bill_Address"],
                      "Export_NYC_Bill_City": x[0]["Export_NYC_Bill_City"],
                      "Export_NYC_Bill_State": x[0]["Export_NYC_Bill_State"],
                      "Export_NYC_Bill_Zip": x[0]["Export_NYC_Bill_Zip"],
                      "Export_NYC_Bill_Country": x[0]["Export_NYC_Bill_Country"],
                      "Export_NYC_Price": x[0]["Export_NYC_Price"],
                      "Export_NYC_Item_Quantity_two": x[1]["Export_NYC_Item_Quantity"],
                      "Export_NYC_Item_Number_two": x[1]["Export_NYC_Item_Number"]
                  }
         } else {
           return {
                     "Export_NYC_Order_Number": x[0]["Export_NYC_Order_Number"],
                     "Export_NYC_Order_Date": x[0]["Export_NYC_Order_Date"],
                     "Export_NYC_Item_Quantity": x[0]["Export_NYC_Item_Quantity"],
                     "Export_NYC_Item_Number": x[0]["Export_NYC_Item_Number"],
                     "Export_NYC_Item_Description": x[0]["Export_NYC_Item_Description"],
                     "Export_NYC_Contact": x[0]["Export_NYC_Contact"],
                     "Export_NYC_Ship_Org": x[0]["Export_NYC_Ship_Org"],
                     "Export_NYC_Ship_Address": x[0]["Export_NYC_Ship_Address"],
                     "Export_NYC_Ship_City": x[0]["Export_NYC_Ship_City"],
                     "Export_NYC_Ship_State": x[0]["Export_NYC_Ship_State"],
                     "Export_NYC_Ship_Zip": x[0]["Export_NYC_Ship_Zip"],
                     "Export_NYC_Ship_Country": x[0]["Export_NYC_Ship_Country"],
                     "Export_NYC_Ship_Phone": x[0]["Export_NYC_Ship_Phone"],
                     "Export_NYC_Ship_Email": x[0]["Export_NYC_Ship_Email"],
                     "Export_NYC_Ship_Delivery_Instructions": x[0]["Export_NYC_Ship_Delivery_Instructions"],
                     "Export_NYC_Bill_Org": x[0]["Export_NYC_Bill_Org"],
                     "Export_NYC_Bill_Address": x[0]["Export_NYC_Bill_Address"],
                     "Export_NYC_Bill_City": x[0]["Export_NYC_Bill_City"],
                     "Export_NYC_Bill_State": x[0]["Export_NYC_Bill_State"],
                     "Export_NYC_Bill_Zip": x[0]["Export_NYC_Bill_Zip"],
                     "Export_NYC_Bill_Country": x[0]["Export_NYC_Bill_Country"],
                     "Export_NYC_Price": x[0]["Export_NYC_Price"],
                 };
         }
      });
        let obj = {};
        results = Object.keys(unique.reduce((prev, next) => {
          if(!obj[next["Export_NYC_Order_Number"]]) obj[next["Export_NYC_Order_Number"]] = next;
          return obj;
        }, obj)).map((i) => obj[i]);
        for(let i=0;i<results.length;i++) {
          this.http.post(environment.ordersUrl, {'order': results[i]}).toPromise().then((data)=>{
            console.log(data)
            if (i === results.length-1) {
              this.router.navigate(['message']);
              this.spinner.hide();
            }
          })
          .catch((err)=>{
            if (i === results.length-1) {
              this.router.navigate(['message']);
              this.spinner.hide();
            }
          });
        }
      }
    });
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PapaParseModule } from 'ngx-papaparse';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routing } from './app.routing';
import { CsvImportComponent } from './csv-import/csv-import.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    CsvImportComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PapaParseModule,
    NgxSpinnerModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

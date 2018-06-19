import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsvImportComponent } from './csv-import/csv-import.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: '', component: CsvImportComponent },
  { path: 'message', component: MessageComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

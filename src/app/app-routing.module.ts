import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './routes/add/add.component';
import { HomeComponent } from './routes/home/home.component';
import { ResultComponent } from './routes/result/result.component';
import { VerifyComponent } from './routes/verify/verify.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'result', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

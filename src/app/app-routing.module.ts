import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./routes/home/home.component').then(m => m.HomeComponent) },
  { path: 'add', loadComponent: () => import('./routes/add/add.component').then(m => m.AddComponent) },
  { path: 'verify', loadComponent: () => import('./routes/verify/verify.component').then(m => m.VerifyComponent) },
  { path: 'result',loadComponent: () => import('./routes/result/result.component').then(m => m.ResultComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// COMPONENTS
import { DataEntryFormComponent } from './data-entry-form/data-entry-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';


const routes: Routes = [
  // { path: '',  redirectTo: "/create-form", pathMatch: "full" },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: "/create-form",
        pathMatch: "full"
      },
      {
        path: 'create-form',
        component: DataEntryFormComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-form/:id',
        component: DataEntryFormComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

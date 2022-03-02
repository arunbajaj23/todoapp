import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { SingupComponent } from './login/singup/singup.component';

const routes: Routes = [
{
  path:'',
  component:LoginComponent,
  children:[
    {
      path:'signin',
      component:SigninComponent
    },
    {
      path:'signup',
      component:SingupComponent
    }
    
  ]

},
{
  path:'simpledashboard',
  component:HomeComponent,
  canActivate:[AuthGuard]
},
{
  path:'**',
  component:LoginComponent
}
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

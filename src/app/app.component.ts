import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DemoApp';

  constructor(private route:Router,private rs:HttpService,public spinner: NgxSpinnerService){}
  role;
    username;password;
    ngOnInit()
    {
      if(window.localStorage.getItem("token")!=undefined)
      {
        this.route.navigate(['simpledashboard']);
      }
      // else{
      //      this.route.navigate(['login']);
      // }
    }

    public show(){
      alert("hello");
      this.spinner.show();
    }
    hide(){
      this.spinner.hide();
    }
}

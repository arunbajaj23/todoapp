
import { Component, OnInit } from '@angular/core';
import {   FormBuilder } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpService } from '.././http.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder,private route:Router,private rs:HttpService,public spinner: NgxSpinnerService,private loading:AppComponent) { }
  usernameChageForm;

  usernameText;
  email;
  photo;

  activelist;
  completedlist;
  ngOnInit(): void {


    this.usernameText=window.localStorage.getItem("name");
    this.email=window.localStorage.getItem("email");
    this.photo=environment.Api_url+"/"+window.localStorage.getItem("photo");
    
    this.getActivelist();
    this.getCompletedlist();
    

  }


  getActivelist(){

    this.loading.spinner.show();
    this.rs.tokenpost("/task/getlist",{status:'A'}).subscribe((res)=>{

      this.loading.spinner.hide();
      if(res['response']==1){
         this.activelist=res['data'];
      }
      else{ 
        return Swal.fire('', res['sys_message'], 'error');
      }
    
    },(err)=>{

      this.loading.spinner.hide();
      var message="something went wrong";
      if(err['error']){
        if(err['error']['sys_message']){
          message=err['error']['sys_message'];
        }
      }
      return Swal.fire('', message, 'error');

    });
  }

  getCompletedlist(){

    this.loading.spinner.show();
    this.rs.tokenpost("/task/getlist",{status:'C'}).subscribe((res)=>{

      this.loading.spinner.hide();
      if(res['response']==1){
        this.completedlist=res['data'];
     }
     else{ 
       return Swal.fire('', res['sys_message'], 'error');
     }
    },(err)=>{

      this.loading.spinner.hide();
      var message="something went wrong";
      if(err['error']){
        if(err['error']['sys_message']){
          message=err['error']['sys_message'];
        }
      }
      return Swal.fire('', message, 'error');

    });
  }

  get getControl(){
    return this.usernameChageForm.controls;
  }

  is_open=false;
  open(){
    this.is_open=true;
    $("#addmodal").modal('show');
  }
  close(){
    this.is_open=false;
    $("#addmodal").modal('hide');

    this.getActivelist();
  }


  is_open2=false;
  openEdit(id,content){
    window.localStorage.setItem("id",id);
    window.localStorage.setItem("content",content);
    this.is_open2=true;
    $("#editmodal").modal('show');
  }
  closeEdit(){
    this.is_open2=false;
    $("#editmodal").modal('hide');

    this.getActivelist();
  }


  
  
  completeTask(id){
    Swal.fire({
      title: 'Do you want to complete this task?',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      console.log(result);
      /* Read more about isConfirmed, isDenied below */
      if (result['value']) {
        this.complete(id);
      }
    })
  }
  complete(id){
    this.loading.spinner.show();
    this.rs.tokenpost("/task/complete",{todoid:id}).subscribe((res)=>{

      this.loading.spinner.hide();
                 console.log(res);
                 if(res['response']==1)
                 {

        Swal.fire('', res['sys_message'], 'success');
        this.getActivelist();
        this.getCompletedlist();
                 }
                 else{
  
        return Swal.fire('', res['sys_message'], 'error')
                 }
      },(err)=>{
            var message="something went wrong";
            if(err['error']){
                if(err['error']['sys_message']){
                  message=err['error']['sys_message'];
                }
            }
            this.loading.spinner.hide();
            return Swal.fire('', message, 'error');
        
      });

  }


  logout(){
    window.localStorage.removeItem("token");
    this.route.navigate(['/signin']);
    
  }
}

import { Component, OnInit } from '@angular/core';
import {  FormControl, Validators, FormBuilder } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home.component';
declare var $;
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  constructor(private fb: FormBuilder,private route:Router,private rs:HttpService,public spinner: NgxSpinnerService,private loading:AppComponent,private home:HomeComponent) { }
  addTaskForm;
  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      
      content: new FormControl('',Validators.compose([Validators.required]))
    });
  }

  
  get getControl(){
    return this.addTaskForm.controls;
  }

  
  onSubmit(){
    console.table(this.addTaskForm.value);
    var objFinal=this.addTaskForm.value;
    this.loading.spinner.show();
    this.rs.tokenpost("/task/create",objFinal).subscribe((res)=>{

      this.loading.spinner.hide();
                 console.log(res);
                 if(res['response']==1)
                 {

                  this.home.close();
        return Swal.fire('', res['sys_message'], 'success')
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
}
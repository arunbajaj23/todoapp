import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  tokenpost(url,data){
    let token2 = window.localStorage.getItem('token')
    return this.httpClient.post(environment.Api_url+url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token2
      })
    })
  }
  tokenget(url){
    let token2 = window.localStorage.getItem('token')
    return this.httpClient.get(environment.Api_url+url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token2
      })
    })
  }



  post_withouttoken(url,data)
  {
    return this.httpClient.post(environment.Api_url+url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }



  post_withimg(url,data)
  {
    return this.httpClient.post(environment.Api_url+url, data);
  }


  

}

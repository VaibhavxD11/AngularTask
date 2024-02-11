import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Observable, catchError, map, of } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient, private errorHandler: ErrorHandlerService, private dataService: DataService){}

  httpOptions={
    header:new HttpHeaders({
      "Content-Type":"application/json"
    }),
    withCredentials: true
  }

  isLoggedIn():Observable<boolean>{
    return this.http.get("http://localhost:3000/dashboard", { withCredentials: true }).pipe(
      map((res:any)=>{
        this.dataService.setData(res);
        return res
      }),
      catchError((error)=>of(false))
    )
  }

}

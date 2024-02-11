import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable, catchError, first, map, of } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000";

  httpOptions : {headers:HttpHeaders,  withCredentials: boolean }={
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    withCredentials: true,
  }

  constructor(private http:HttpClient, private errorHandleService: ErrorHandlerService) { }

  signUp(user:Omit<User, "id">):Observable<User>{
    return this.http.post<User>(`${this.url}/signup`,user,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandleService.handleError<User>("signup"))
    )
  }

  login(user:Omit<User, "id">):Observable<User>{
    return this.http.post<User>(`${this.url}/login`,user,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandleService.handleError<User>("login"))
    )
  }

  logout():Observable<any>{
    return this.http.get(`${this.url}/logout`,this.httpOptions).pipe(
      map((res:any)=>{
        return res;
      }),
      catchError((error)=>{return error})
    )
  }

  getTask():Observable<any>{
    return this.http.get(`${this.url}/getTask`, this.httpOptions).pipe(
      map((res:any)=>{
        console.log(res);
        return res;
      }),
      catchError(this.errorHandleService.handleError<Task>("gettask"))
      // catchError((error)=>{
      //   console.log(error);
      //   return error;
      // })
    )
  }

  createTask(task:Task):Observable<any>{
    console.log(task);
    return this.http.post<Task>(`${this.url}/addTask`,task,this.httpOptions).pipe(
      map((res:any)=>{
        console.log(res);
        return res;
      }),
      catchError(this.errorHandleService.handleError<Task>("createtask"))
    )
  }

  editTask(task:Task, id:number):Observable<Task>{
    console.log(task);
    console.log(id);
    return this.http.put<Task>(`${this.url}/updatetask/${id}`,task,this.httpOptions).pipe(
      map((res)=>{
        console.log(res);
        return res;
      }),
      catchError(this.errorHandleService.handleError<Task>("edittask"))
    )
  }

  deleteTask(id:number):Observable<any>{
    return this.http.delete(`${this.url}/deleteTask/${id}`,this.httpOptions).pipe(
      map((res)=>{
        console.log(res)
      }),
      catchError(this.errorHandleService.handleError<Task>("deletetask"))
    )
  }
}

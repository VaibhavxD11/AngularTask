import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { TasksComponent } from '../tasks/tasks.component';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { Task } from 'src/app/models/Task';
import { interval } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

  public allTask: Task[] = [];
  public final: any[] = [];

  public items = [];
  public pageOfItems: any=[];
  public page = 0;
  public itemsCount = 6;
  public authData:any;

  public showEdit: boolean = false;

  public lastTaskId:any;
  public sendId = 0;
  constructor(private dataService:DataService, private authService: AuthService,
    public datepipe: DatePipe,private router: Router, private _snackBar: MatSnackBar,
    private popup:PopupService, private session : SessionService, private cookieService: CookieService
    ){

    this.authData = this.dataService.getData();
    // console.log(this.authData);
    this.authService.getTask().subscribe({
      next: (response)=>{
        this.allTask = response.result;
        this.final = this.allTask.map((ele)=>{
          return {
            ele,
            due_date: this.datepipe.transform(ele['due_date'], 'dd/MM/yyyy')
          }
        })
        // console.log(this.final);
        this.dataService.setEditData(this.final);
      },
      error: (error)=>{
        console.log(error);
      }
    }
    )
  }

  ngOnChanges(){
    
  }

  checkLogin(){
    this.session.isLoggedIn().subscribe((loggedIn:boolean)=>{
      if(loggedIn){
        this.router.navigate(['/']);
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(){
    interval(300000).subscribe(()=>{
      this.checkLogin();
    })


    this.dataService.onTaskAdded.subscribe((newTask) => {
      if (newTask) {
        this.allTask.push(newTask);
        this.final = this.allTask.map((ele) => {
          return {
            ele,
            due_date: this.datepipe.transform(ele['due_date'], 'dd/MM/yyyy'),
          };
        });
      }
    });
  }

  // userLoggedIn(){
  //   this.session.isLoggedIn().subscribe((loggedIn:boolean)=>{
  //     if(loggedIn){
  //       this.router.navigate(['/']);
  //       console.log("-------");
  //     }
  //     else{
  //       this.router.navigate(['/login']);
  //     }
  //   });
  // }
  
  // refreshData(){
  //   this.dataService.onFormSubmitSuccess.subscribe(() => {
  //     this.initializeDashboard();
  //   });
  // }


  onLogout():void{

    this.authService.logout().subscribe(
      {
        next: (response)=>{
          console.log(response);
          this.cookieService.deleteAll();
          this.openSnackBar("Logout Succesful");
          this.router.navigate(['login']);
        },
        error:(error)=>{
          console.log(error)
        }
    }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
    });
  }

  onPopupOpen(){
    this.popup.createTask();
  }

}

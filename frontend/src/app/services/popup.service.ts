import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateComponent } from '../components/create/create.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { Task } from '../models/Task';
import { EditComponent } from '../components/edit/edit.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  createTask(){
    this.dialog.open(CreateComponent);
  }

  editTask(title: string, desc: string, date: string, id:number){
    console.log(title, desc, date);
    this.dialog.open(EditComponent, {
      data:{
        title: title,
        desc: desc,
        date: date,
        id:id
      }
    });
  }
  // onPopupClose(){
  //   this.dialogRef.close();
  // }
}

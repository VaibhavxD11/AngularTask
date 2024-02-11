import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogcardComponent } from '../dialogcard/dialogcard.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  public authData:any;
  @Input() title: string='';
  @Input() date: string='';
  @Input() desc: string='';
  @Input() id: number=0;


  isEditing = false;
  editedTitle = '';
  editedDate = '';
  editedDesc = '';

  editTaskForm!: FormGroup;

  constructor(private dataService:DataService, private authService: AuthService,
    public datepipe: DatePipe,private popup:PopupService,private dialog: MatDialog,
    private router: Router
    ){
    }

    isCardOpen: boolean = false;
    toggleCard() {
      if (this.isCardOpen) {
            this.openDialog();
          } else {
            this.isCardOpen = !this.isCardOpen;
          }
      // if (!this.isEditing) {
      //   if (this.isCardOpen) {
      //     this.openDialog();
      //   } else {
      //     this.isCardOpen = !this.isCardOpen;
      //   }
      // }
    }

  openDialog() {
    const dialogRef = this.dialog.open(DialogcardComponent, {
      data: {
        title: this.title,
        date: this.date,
        desc: this.desc,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isCardOpen = false;
    });
  }

  startEditing() {
    // this.isEditing = true;

    this.editedTitle = this.title;
    this.editedDate = this.date;
    this.editedDesc = this.desc;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit() {
    this.title = this.editedTitle;
    this.date = this.editedDate;
    this.desc = this.editedDesc;

    this.isEditing = false;
  }

  onPopupOpen(event: MouseEvent){
    this.popup.editTask(this.title, this.desc, this.date, this.id);
    event.stopPropagation();
  }


  deleteTask(){
    console.log("task_id-",this.id);
    this.authService.deleteTask(this.id).subscribe({
      next: (response)=>{
        console.log("Delete Success", response);
        this.router.navigate(['/login'])
      },
      error: (error) => {
        console.error('Delete error:', error);
      },
    })
  }


  

}

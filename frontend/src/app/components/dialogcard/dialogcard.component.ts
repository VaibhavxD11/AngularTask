import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogcard',
  templateUrl: './dialogcard.component.html',
  styleUrls: ['./dialogcard.component.css']
})
export class DialogcardComponent {
  editedTitle = '';
  editedDate = '';
  editedDesc = '';
  editTaskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogcardComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ) {

    this.editedTitle = data.title;
    this.editedDate = data.date;
    this.editedDesc = data.desc;

    this.editTaskForm = this.fb.group({
      editedTitle: ['', Validators.required],
      editedDate: ['', Validators.required],
      editedDesc: ['', Validators.required],
    });
  }

  saveEdit(): void {
    this.dialogRef.close();
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }
}








// import { Component, Inject, Input, OnDestroy } from '@angular/core';
// import { MatCalendar } from '@angular/material/datepicker';
// import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
// import { AuthService } from 'src/app/services/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { DataService } from 'src/app/services/data.service';
// import { Task } from 'src/app/models/Task';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-dialogcard',
//   templateUrl: './dialogcard.component.html',
//   styleUrls: ['./dialogcard.component.css'],
// })
// export class DialogcardComponent implements OnDestroy {
//   editedTitle = '';
//   editedDate = '';
//   editedDesc = '';
//   private _destroyed = new Subject<void>();
//   editTask!: FormGroup;
//  @Input() sendID=0;

//   constructor(
//     public dialogRef: MatDialogRef<DialogcardComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private _calendar: MatCalendar<Date>,
//     private _dateAdapter: DateAdapter<Date>,
//     @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
//     private fb: FormBuilder,private _snackBar: MatSnackBar,
//     private datePipe: DatePipe, private authService: AuthService, 
//     private dataservice:DataService
//   ) {
//     _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {});
//     this.editedTitle = data.title;
//     this.editedDate = data.date;
//     this.editedDesc = data.desc;
//   }

//   ngOnInit() {
//     this.editTask = this.createFormGroup();
//   }

//   ngOnDestroy() {
//     this._destroyed.next();
//     this._destroyed.complete();
//   }

//   get periodLabel() {
//     return this._dateAdapter
//       .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
//       .toLocaleUpperCase();
//   }

//   previousClicked(mode: 'month' | 'year') {
//     this._calendar.activeDate =
//       mode === 'month'
//         ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
//         : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
//   }

//   nextClicked(mode: 'month' | 'year') {
//     this._calendar.activeDate =
//       mode === 'month'
//         ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
//         : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
//   }

//   createFormGroup(): FormGroup {
//     return this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(3)]],
//       due_date: [null, Validators.required],
//       task_desc: ['', Validators.required],
//     });
//   }

//   get dueDate() {
//     return this.editTask.get('dueDate');
//   }

//   openSnackBar(message: string) {
//     this._snackBar.open(message, undefined, {
//       duration: 3000,
//     });
//   }


//   onSubmit() {
//     if (this.editTask.valid) {
//       const dueDateValue = this.editTask.get('due_date')?.value;
//       this.editTask.get('due_date')?.setValue(this.datePipe.transform(dueDateValue, 'yyyy-MM-dd'));
//       console.log(this.editTask.value);
//       const taskData = this.editTask.value as Task;
//       console.log(taskData);


//     //   this.authService.createTask(this.createTask.value).subscribe({
//     //     next: (response) => {
//     //       console.log('Add successful:', response);
//     //       this.openSnackBar("Task Added Successfully");
//     //       this.dataservice.emitTaskAdded(this.createTask.value);
//     //       this.dataservice.emitFormSubmitSuccess();

//     //       // this.router.navigate(['/dashboard']);
//     //     },
//     //     error: (error) => {
//     //       console.error('Login error:', error);
//     //     },
//     //   })

//     // } else {
//     //   // Handle the case when the form is invalid
//     // }
//     }
//   }
// }


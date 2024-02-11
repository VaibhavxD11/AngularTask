import { Component, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/Task';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';
import { validateDueDate } from '../../validators/date.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent<D> implements OnDestroy {
  private _destroyed = new Subject<void>();
  createTask!: FormGroup;
 @Input() sendID=0;
 @Output() childCreateFunction: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    private fb: FormBuilder,private _snackBar: MatSnackBar,
    private datePipe: DatePipe, private authService: AuthService, 
    private dataservice:DataService, private router: Router,private popup:PopupService,
    private dialogRef: MatDialogRef<CreateComponent<D>>
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {});
  }

  ngOnInit() {
    this.createTask = this.createFormGroup();
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      due_date: [null,validateDueDate],
      task_desc: ['', Validators.required],
    });
  }

  get dueDate() {
    return this.createTask.get('dueDate');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }


  onSubmit() {
    if (this.createTask.valid) {
      const dueDateValue = this.createTask.get('due_date')?.value;
      this.createTask.get('due_date')?.setValue(this.datePipe.transform(dueDateValue, 'yyyy-MM-dd'));
      console.log(this.createTask.value);
      const taskData = this.createTask.value as Task;
      console.log(taskData);
      console.log(this.createTask.get('due_date')?.value);


      this.authService.createTask(this.createTask.value).subscribe({
        next: (response) => {
          console.log('Add successful:', response);
          // this.popup.onPopupClose;
          this.createTask.reset();
          this.router.navigate(['/login']);
          this.openSnackBar("Task Added Successfully");
          this.dialogRef.close();
          // this.dataservice.emitTaskAdded(this.createTask.value);
          // this.dataservice.emitFormSubmitSuccess();

          // this.router.navigate(['/dashboard']);
        },
        error: (error) => {
            if(error.status===401){
              console.log("Session Timed Out");
              this.dialogRef.close();
              this.openSnackBar("Session Timeout Login Again");
              this.router.navigate(['/login']);

            }
        },
      })

    } 
  }
}

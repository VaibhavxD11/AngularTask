import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';
import { validateDueDate } from '../../validators/date.validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent<D> implements OnDestroy, OnChanges {
  @Input() title: any;
  @Input() date: any;
  @Input() desc: any;
  @Input() id: any;
  editTask!:FormGroup;
  due_date='';
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    private fb: FormBuilder,private _snackBar: MatSnackBar,
    private datePipe: DatePipe, private authService: AuthService, 
    private dataservice:DataService, private router: Router,private popup:PopupService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditComponent<D>>,
    public datepipe: DatePipe
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'] || changes['date'] || changes['desc'] || changes['id']) {
      console.log(changes);
    }
  }


  ngOnInit() {
    this.editTask = this.createFormGroup();
    console.log(this.data);
    this.editTask.patchValue({
            title: this.data.title,
            due_date: this.data.date,
            task_desc: this.data.desc,
          });

    console.log(this.editTask.get('due_date')?.value);

    // this.dataservice.data.pipe(takeUntil(this._destroyed)).subscribe(
    //   (data)=>{
    //     console.log(data);
    //     this.editTask.patchValue({
    //       title: this.data.title,
    //       due_date: this.data.date,
    //       task_desc: this.data.desc,
    //     });
    //   }
      
    // )
    
  }

  dateChange(){
    console.log(this.due_date);
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

  // createFormGroup(): FormGroup {
  //   return this.fb.group({
  //     title: [this.title, [Validators.required, Validators.minLength(3)]],
  //     due_date: [new Date(), Validators.required],
  //     task_desc: [this.desc, Validators.required],
  //   });
  // }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl([this.title, [Validators.required, Validators.minLength(3)]]),
      due_date: new FormControl(null,[validateDueDate]),
      task_desc: new FormControl(null, [Validators.required]),
    });
  }




  get dueDate() {
    return this.editTask.get('due_date')?.value;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

 
  onSubmit(){
    if(this.editTask.valid){
      const dueDateValue = this.editTask.get('due_date')?.value;
      this.editTask.get('due_date')?.setValue(this.datePipe.transform(dueDateValue, 'yyyy-MM-dd'));
      console.log(this.data.title, this.data.id);
      console.log(this.editTask.value);

      this.authService.editTask(this.editTask.value,this.data.id).subscribe({
        next: (response)=>{
          console.log(response);
          this.dialogRef.close();
          this.openSnackBar("Task Editted Successfully");
          this.router.navigate(['/login']);
          return response;
        },
        error: (error)=>{
          if(error.status===401){
            console.log("Session Timed Out");
            this.dialogRef.close();
            this.openSnackBar("Session Timeout Login Again");
            this.router.navigate(['/login']);

          }
        }
      })
    }

  }

}

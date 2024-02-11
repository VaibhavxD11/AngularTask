import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;

  constructor() { }
  private authData:any;
  private dataSources = new BehaviorSubject<any[]>([]);

  data = this.dataSources.asObservable();
  onFormSubmitSuccess = new EventEmitter<void>();

  setData(data:any):void{
    this.authData = data;
  }

  getData():any{
    return this.authData;
  }

  onTaskAdded = new EventEmitter<Task>();

  emitTaskAdded(task:Task) {
    this.onTaskAdded.emit(task);
  }

  emitFormSubmitSuccess() {
    console.log('Form submit success event emitted');

    this.onFormSubmitSuccess.emit();
  }


  setEditData(data: any[]): void {
    this.dataSources.next(data);
  }

}

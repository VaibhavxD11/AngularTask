import { AbstractControl } from '@angular/forms';


export function validateDueDate(control: AbstractControl):{[key:string]:boolean} | null {
    const selectedDate = control.value;
    const currentDate = new Date();
  
    if (selectedDate < currentDate) {
      return ({ 'invalidDate': true });
    } else {
      return null;
    }
  }
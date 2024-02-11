import { AbstractControl } from "@angular/forms";

export function validField(control: AbstractControl):{[key:string]:boolean} | null{
    let len = control.value.length;
    // console.log(control.value.slice(0,len));
    if(control.value && typeof control.value==='string'){
        if(control.value.startsWith(' ')){

        }
        if(control.value.endsWith(' ')){
            control.setValue(control.value.trim());
            console.log(control.value.trim())
            return {'spaces':true};
        }
    }
    else{
        
    }
    return null;
}
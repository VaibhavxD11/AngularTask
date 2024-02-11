import { AbstractControl } from "@angular/forms";

export function validPassword(control: AbstractControl):{[key:string]:boolean} | null{
    const password = control.get('password');
    const cnfpassword = control.get('cnfpassword');
    console.log(password, cnfpassword);
    if(password?.pristine || cnfpassword?.pristine){
        return null;
    }
    return password && cnfpassword && password.value !=cnfpassword.value ?
    {'mismatch':true} : null;
}
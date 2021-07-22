import { AbstractControl, ValidatorFn } from "@angular/forms";

export function dateValidation() : ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const today = new Date();
        var todayTime = today.getTime();
        var todayYear = today.getFullYear();
        var date = new Date(control.value);
        var moreThan10Years = date.getFullYear() + 10;
        
        if(!(control && date)) {
            return null;
        }
        return date.getTime() > todayTime || todayYear <= moreThan10Years ? {invalidDate: {value :'You cannot use future dates' } } : null;
    };
}
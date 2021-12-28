import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';





@Injectable({
    providedIn:'root'
})


export class ValidationForm {


    constructor() {}


    validateNumber(number: FormControl) {
        if (number.value) {
         let numberNum  =  number.value.toString();
          return numberNum.length >= 8
            ? null
            : {
                validateNum: {
                  valid: false,
                },
              };
        }
      }

}
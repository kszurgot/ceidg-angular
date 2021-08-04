import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[appNipValidator][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: NipValidatorDirective, multi: true}]
})
export class NipValidatorDirective implements Validator {
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let nip = control.value;

    if(typeof nip !== 'string' || nip.length < 13) {
      return null;
    }

    nip = nip.replace(/[\ \-]/gi, '');

    let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    let controlNumber = parseInt(nip.substring(9, 10));
    let weightCount = weight.length;
    for (let i = 0; i < weightCount; i++) {
        sum += (parseInt(nip.substr(i, 1)) * weight[i]);
    }

    if (sum % 11 !== controlNumber) {
      return {'nip': true};
    }
  }
}

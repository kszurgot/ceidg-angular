import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
  selector: '[appRegonValidator][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegonValidatorDirective, multi: true}]
})
export class RegonValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let regon = control.value;

    const reg = /^(?=(?:.{9}|.{14})$)[0-9]*$/u;

    if(typeof regon !== 'string' || regon.length == 0) {
      return null;
    }

    if(!reg.test(regon)) {
      return {'wrongLength': true};
    }

    const weightsNine: number[] = [8, 9, 2, 3, 4, 5, 6, 7];

    if (regon.length === 9) {
        return !this.checksum(regon, weightsNine) ? {'regon': true} : null;
    }

    const weightsFourteen: number[] = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
    return !this.checksum(regon.slice(0, 9), weightsNine) || !this.checksum(regon, weightsFourteen)
            ? {'regon': true} : null;
  }

  checksum(number: string, weights: number[]) {
    const max = number.length - 1;
    let sum = 0;

    for (let i = 0; i < max; ++i) {
        const n = parseInt(number.charAt(i), 10);
        sum += n * (weights[i] as number);
    }

    const control = sum % 11;
    const resultSum = control === 10 ? 0 : control;
    const lastDigit = parseInt(number.slice(-1), 10);

    return resultSum === lastDigit;
  }
}

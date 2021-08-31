import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PKDCode'
})
export class PKDCodePipe implements PipeTransform {

  format(value: string): string {
    let PKDCode: string = "";
    for (let i = 0; i < value.length; i++) {
      PKDCode += value[i];
      if ((i === 1 || i === 3) && i+1 !== value.length) {
        PKDCode += ".";
      }
    }

    return PKDCode;
  }

  transform(data: any): string {
    let PKDCode: string = "";

    if (Array.isArray(data)) {
      data.forEach((value) => {
        PKDCode += this.format(value);
        PKDCode += ", ";
      });

      // Removes ", " from end string
      PKDCode = PKDCode.substring(0, PKDCode.length - 2);
    } else {
      PKDCode = this.format(data);
    }

    return PKDCode;
  }

}

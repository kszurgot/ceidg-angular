import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(data: Address): string {
      let address = "";

      if (data.street == null) {
        address += data.postcode || data.city ? "" : "-";
        address += data.postcode || "";
        address += data.city ? " " + data.city : "";
        address += data.houseNumber ? " " + data.houseNumber : "";
        
        return address;
      }
      
      address += data.street + " " + data.houseNumber;
      address += data.apartmentNumber ? " lok. " + data.apartmentNumber : "";
      address += data.postcode || data.city ? ", " : "-";
      address += data.postcode + " " + data.city;
      return address;
  }

}

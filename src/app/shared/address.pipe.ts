import { Pipe, PipeTransform } from '@angular/core';
import { SimpleCompany } from '../models/simpleCompany';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(company: SimpleCompany): string {
      let address = "";

      if (company.street == null) {
        address += company.postcode || company.city ? "" : "-";
        address += company.postcode || "";
        address += company.city ? " " + company.city : "";
        address += company.houseNumber ? " " + company.houseNumber : "";
        
        return address;
      }
      
      address += company.street + " " + company.houseNumber;
      address += company.apartmentNumber ? " lok." + company.apartmentNumber : "";
      address += company.postcode || company.city ? ", " : "-";
      address += company.postcode + " " + company.city;
      return address;
  }

}

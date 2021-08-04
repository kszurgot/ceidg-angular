export class CompaniesQuery {

    constructor(
      public nip?: string,
      public regon?: string,
      public companyName?: string,
      public PKDCode?: string,
      public status?: string,
      public businessOwnerFirstName?: string,
      public businessOwnerLastName?: string,
      public street?: string,
      public houseNumber?: string,
      public apartmentNumber?: string,
      public city?: string,
      public postcode?: string,
      public voivodeship?: string,
      public district?: string,
      public community?: string,
      public startDateFrom?: string,
      public startDateTo?: string, 
      public updateDateFrom?: string,
      public updateDateTo?: string,
    ) {}
  }
  
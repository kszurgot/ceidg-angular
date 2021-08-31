import { Address } from "./address";
import { Citizenship } from "./citizenship";
import { Company } from "./company";

export interface ExtendedCompany extends Company {
  mainPKDCode: string;
  PKDCode: Array<string>;
  businessAddress: Address;
  correspondenceAddress: Address;
  citizenships: Citizenship;
  phone?: string;
  email?: string;
  www?: string;
}

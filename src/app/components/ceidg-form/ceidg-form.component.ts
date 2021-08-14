import { ChangeDetectorRef, Component } from '@angular/core';
import { CompaniesQuery } from '../../models/companiesQuery';
import Utils from '../../utils'
import { HttpService } from 'src/app/services/http.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-ceidg-form',
  templateUrl: './ceidg-form.component.html',
  styleUrls: ['./ceidg-form.component.sass']
})
export class CeidgFormComponent {

  response: Object;
  model: CompaniesQuery = {}; // New
  submitted: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  faSearch = faSearch;

  constructor(private changeDetectorRef: ChangeDetectorRef,private httpService: HttpService) {}

  onSubmit(): void {
    Utils.removeEmptyProperties(this.model);

    this.loading = true;
    this.submitted = true;

    this.httpService.getCompanies(this.model).subscribe(
      data => {
        this.response = data;
      },
      err => {
        this.error = true;
      },
      () => {
        this.loading = false;
      }
    );
  }

  // TODO: Remove this when we're done
  // log(value: any) {
  //   console.log(value);
  // }

  nip(nip: string): void {
    this.changeDetectorRef.detectChanges();

    nip = nip.replace(/[^0-9]/g, "").substring(0, 10);
    this.model.nip = "";

    for (let i = 0; i < nip.length; i++) {
      this.model.nip += nip[i];
      if ((i === 2 || i === 4 || i == 6) && i+1 !== nip.length) {
        this.model.nip += "-";
      }
    }
  }

  regon(regon: string): void {
    this.changeDetectorRef.detectChanges();
    this.model.regon = regon.replace(/[^0-9]/g, "");
  }

  PKDCode(PKDCode: string): void {
    this.changeDetectorRef.detectChanges();
    PKDCode = PKDCode.toUpperCase();
    PKDCode = PKDCode.replace(/\./g, "");

    let firstPart: string = PKDCode.substring(0, 4).replace(/[^0-9]/g, "");
    let lastPart: string = PKDCode.substring(4).replace(/[^A-Z]/g, "");
    PKDCode = firstPart + lastPart;

    this.model.PKDCode = "";

    for (let i = 0; i < PKDCode.length; i++) {
      this.model.PKDCode += PKDCode[i];
      if ((i === 1 || i === 3) && i+1 !== PKDCode.length) {
        this.model.PKDCode += ".";
      }
    }
  }

  postcode(postcode: string): void {
    this.changeDetectorRef.detectChanges();

    postcode = postcode.replace(/[^0-9]/g, "").substring(0, 5);
    this.model.postcode = "";

    for (let i = 0; i < postcode.length; i++) {
      this.model.postcode += postcode[i];
      if (i === 1 && i+1 !== postcode.length) {
        this.model.postcode += "-";
      }
    }
  }

  reset(): void {
    this.submitted = false;
    this.loading = false;
    this.error = false;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}

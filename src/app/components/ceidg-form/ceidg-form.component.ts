import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CompaniesQuery } from '../../models/companiesQuery';
import Utils from '../../utils'
import { HttpService } from 'src/app/services/http.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-ceidg-form',
  templateUrl: './ceidg-form.component.html',
  styleUrls: ['./ceidg-form.component.sass']
})
export class CeidgFormComponent implements OnInit {

  response: Object;
  model: CompaniesQuery = {}; // New
  submitted: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  faSearch = faSearch;

  constructor(private changeDetectorRef: ChangeDetectorRef, private httpService: HttpService, private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.getLoadingState().subscribe((loadingState) => {
      this.loading = loadingState
    });
    this.stateService.getErrorState().subscribe((errorState) => {
      this.error = errorState
    });

  }

  onSubmit(): void {
    Utils.removeEmptyProperties(this.model);

    this.submitted = true;
    this.stateService.setLoadingState(true);

    this.httpService.getCompanies(this.model)
      .subscribe(
        data => {
          this.response = data;
        },
        err => {
          this.stateService.setErrorState(true);
        },
        () => {
          this.stateService.setFormSubmitState(true);
        }
      ).add(() => {
        this.stateService.setLoadingState(false);
      });
  }

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
  }
}

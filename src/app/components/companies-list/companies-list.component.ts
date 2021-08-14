import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SimpleCompany } from 'src/app/models/simpleCompany';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.sass']
})
export class CompaniesListComponent implements OnChanges {

  companies: Array<SimpleCompany> = [];
  faArrowLeft = faArrowLeft;

  @Input()
  response: boolean;

  @Output()
  resetForm = new EventEmitter<null>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.response) {
      console.log(this.response);
      this.companies = changes.response.currentValue?.companies;
      console.log(this.companies);
    }
  }

  backToForm(): void {
    this.resetForm.emit(null);
  }

}

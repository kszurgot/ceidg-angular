import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SimpleCompany } from 'src/app/models/simpleCompany';
import { Pagination } from "src/app/models/pagination";
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { StateService } from "src/app/services/state.service";

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.sass']
})
export class CompaniesListComponent implements OnChanges {

  companies: Array<SimpleCompany> = [];
  pagination?: Pagination;
  faArrowLeft = faArrowLeft;

  @Input()
  response: Object;

  @Output()
  resetForm = new EventEmitter<null>();

  constructor(private stateService: StateService) { }

  ngOnChanges(changes: SimpleChanges) {
      this.companies = changes.response.currentValue?.companies ?? [];
      this.pagination = changes.response.currentValue?.links
        ? new Pagination(changes.response.currentValue.links)
        : null;
  }

  backToForm(): void {
    this.stateService.setFormSubmitState(false);
    this.resetForm.emit(null);
  }

  changePage(response): void {
    this.companies = response.companies;
    this.pagination = new Pagination(response.links);
  }
}

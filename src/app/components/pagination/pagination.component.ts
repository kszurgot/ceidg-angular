import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { PaginationItem } from 'src/app/models/paginationItem';
import { HttpService } from 'src/app/services/http.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnChanges {

  @Input()
  pagination: Pagination;

  @Output()
  updateCompaniesList = new EventEmitter();

  sortedPaginationItems: Array<PaginationItem>;

  constructor(private httpService: HttpService, private stateService: StateService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.pagination) {
      this.pagination = changes.pagination.currentValue;
      this.sortedPaginationItems = this.pagination.getSortedItems();
    }
  }

  changePage(link) {
    this.stateService.setLoadingState(true);
    this.httpService.getCompaniesByUrl(link)
      .subscribe(
        data => {
          this.updateCompaniesList.emit(data);
        },
        err => {
          this.stateService.setErrorState(true);
        }
      ).add(() => {
        this.stateService.setLoadingState(false);
      });

  }

}

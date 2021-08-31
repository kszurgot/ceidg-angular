import { Component, Input, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ExtendedCompany } from 'src/app/models/extendedCompany';
import { SimpleCompany } from 'src/app/models/simpleCompany';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {

  faEye = faEye
  isModalShown: boolean = false;
  model?: ExtendedCompany;
  error: boolean = false;
  loading: boolean = false;

  @Input()
  simpleCompany: SimpleCompany

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isModalShown = true;

    if (!this.model) {
      this.loading = true;
      this.httpService.getCompany(this.simpleCompany.id).subscribe(
        data => {
          if (data.PKDCode && data.mainPKDCode) {
            data.PKDCode = data.PKDCode.filter((item: string) => { 
              return item != data.mainPKDCode
            });
          }
          this.model = data;
        },
        err => {
          this.error = true;
        }
      ).add(() => {
        this.loading = false;
      });
    }
  }

  closeModal(): void {
    this.isModalShown = false;
  }

  displayModal(): string {
    return this.isModalShown ? 'block' : 'none';
  }
}

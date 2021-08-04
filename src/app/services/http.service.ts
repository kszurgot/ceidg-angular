import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CompaniesQuery } from '../models/companiesQuery';
import * as QueryString from "query-string"

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getCompanies(model: CompaniesQuery): Observable<any> {
    let queryString = QueryString.stringify(model);
    queryString = queryString ? "?" + queryString : "";
    console.log(queryString);
    return this.http.get(`${environment.apiUrl}/companies${queryString}`);
  }
}

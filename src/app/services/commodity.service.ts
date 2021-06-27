import { Commodity, CommodityResponse } from './../model/commodity.model';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  private searchURL: string;

  private invokeURL: string;

  constructor(private httpClient: HttpClient) {
    this.searchURL = environment.commodities_api_base_url + '/query';
    this.invokeURL = environment.commodities_api_base_url + '/submit/commodity';
  }

  searchCommodities(key: string): Observable<CommodityResponse[]> {
    return this.httpClient.post<CommodityResponse[]>(this.searchURL, key);
  }

  submitCommodity(commodity: Commodity): Observable<any> {
    return this.httpClient.post<any>(this.invokeURL, commodity);
  }

}

import { CommodityService } from './../services/commodity.service';
import { CommodityResponse, Commodity } from '../model/commodity.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-commodities',
  templateUrl: './search-commodities.component.html',
  styleUrls: ['./search-commodities.component.scss']
})
export class SearchCommoditiesComponent implements OnInit {

  isProcessing: boolean = false;

  message: string = "";

  commodities: CommodityResponse[] = [];

  lastSearchedKey: string = "";

  constructor(private commodityService: CommodityService) { }

  ngOnInit(): void {
    this.commodities = [];
  }

  close() {
    this.message = "";
  }

  loadCommodities(key:string) {
    this.message = "";
    if (!key || key.trim() === "") {
      this.message = "Please provide a keyword";
      return;
    }
    this.isProcessing = true;
    this.commodities = [];
    const self = this;
    this.commodityService.searchCommodities(key).subscribe(data => {
      this.commodities = data;
      this.isProcessing = false;
      this.lastSearchedKey = key;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {SamsearchService} from "../app.service";
import { HttpClient } from '@angular/common/http';
import {PageEvent} from "@angular/material/paginator";



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  showSearchResults = false;
  title = 'SAM Search API';
  pagedResults = [];
  pageSize = 10;
  currentPage = 0;
  samSearchResults: any[] = [];
  nextToken: string | null = null;
  selectedRadio: any


  ngOnInit() {
      this.updatePagedResults();

  }
  basicSearch = {
    samInput: '',
    filters: {
      sam: '',
      firstName: '',
      lastName:'',
      address:'',
      classification: '',
      firmName:'',
      exclusionAgency:'',
      uniqueID:''
    },
  };

  semanticSearch = {
    text: '',
  };

  constructor(private http: HttpClient, private samSearchService: SamsearchService) { }

  onRadioChange(event: Event) {
    this.selectedRadio = (event.target as HTMLInputElement).value;
  }

  onBasicSearchSubmit() {
    console.log('Basic Search Submitted:', this.basicSearch);
    this.fetchSAMSearchData();
    this.showSearchResults = true;
    this.basicSearch = { samInput: '', filters: {
        sam: '',
        firstName: '',
        lastName:'',
        address:'',
        classification: '',
        firmName:'',
        exclusionAgency:'',
        uniqueID:''
      }};
  }

  onSemanticSearchSubmit() {
    console.log('Semantic Search Submitted:', this.semanticSearch.text);
    this.showSearchResults = true;

  }


  onPageChange(event: PageEvent) {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePagedResults();
  }

    updatePagedResults() {
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedResults = this.samSearchResults.slice(startIndex, endIndex);
    }

  fetchSAMSearchData() {
    this.samSearchService.listSAMDATA(this.selectedRadio, this.basicSearch.samInput).subscribe(
        (response: any) => {
          this.samSearchResults = response.data.listSAMDATA.items;
          this.nextToken = response.data.listSAMDATA.nextToken;
          this.currentPage=0;
          this.updatePagedResults();
        },
        (error: any) => {
          console.error('Error fetching SAMSearch data:', error);
        }
    );

  }
}

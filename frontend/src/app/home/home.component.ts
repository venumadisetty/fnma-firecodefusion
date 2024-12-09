import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {

  ngOnInit() {

  }
  basicSearch = {
    samInput: '',
    filters: {
      name: false,
      classification: false,
      sam: false,
      cageCode: false,
    },
  };

  semanticSearch = {
    text: '',
  };

  showSearchResults = false;

  tableData: any[] = []; // Holds data to display in the table

  constructor(private http: HttpClient) { }

  onBasicSearchSubmit() {
    console.log('Basic Search Submitted:', this.basicSearch);
    this.loadMockData();
    this.showSearchResults = true;
  }

  onSemanticSearchSubmit() {
    console.log('Semantic Search Submitted:', this.semanticSearch.text);
    this.loadMockData();
    this.showSearchResults = true;
  }

  // Fetch mock data from JSON
  loadMockData() {
    this.http.get<any[]>('assets/mock-data.json').subscribe(
      (data) => {
        console.log('Loaded Data:', data);
        this.tableData = data; // Set the data to display
      },
      (error) => {
        console.error('Error loading mock data:', error);
      }
    );
  }

}

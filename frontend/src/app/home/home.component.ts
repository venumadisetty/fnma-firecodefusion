import { Component, OnInit } from '@angular/core';
import {SamsearchService} from "../app.service";
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  showSearchResults = false;
  tableData: any[] = [];
  title = 'SAM Search API';
  samSearchResults: any[] = [];
  nextToken: string | null = null;
  selectedRadio: any


  ngOnInit() {

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
    this.loadMockData();
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

  fetchSAMSearchData() {
    console.log(this.selectedRadio)
    console.log(this.basicSearch.samInput)
    this.samSearchService.listSAMDATA(this.selectedRadio, this.basicSearch.samInput).subscribe(
        (response: any) => {
          this.samSearchResults = response.data.listSAMDATA.items;
          this.nextToken = response.data.listSAMDATA.nextToken;
        },
        (error: any) => {
          console.error('Error fetching SAMSearch data:', error);
        }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SamsearchService {
    private apiUrl: string = 'https://kjpr7uni2nhffocmb7hfryvzyq.appsync-api.us-east-1.amazonaws.com/graphql'; // Replace with your AppSync URL
    private apiKey: string = 'da2-rfydwyvjffh2lfpoy2vttpj67a'; // Replace with your AppSync API key

    constructor(private http: HttpClient) {}
    // Function to execute the GraphQL query
    listSAMDATA(header: string, filterValue: string): Observable<any> {
        const query = `
        query ListSAMDATA($filter: TableSAMDATAFilterInput, $limit: Int, $nextToken: String) {
          listSAMDATA(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              SAMNumber
              Classification
              Name
              Prefix
              First
              Middle
              Last
              Suffix
              Address1
              Address2
              City
              State
              Country
              ZipCode
              UniqueEntityID
              ExclusionProgram
              ExcludingAgency
              ExclusionType
              AdditionalComments
              ActiveDate
              TerminationDate
              CrossReference
              CAGE
              CreationDate
            }
            nextToken
          }
        }`;
        const variables = {
            filter: { [header]: { contains: filterValue } },
        };

        const headers = new HttpHeaders({
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json',
        });

        return this.http.post(this.apiUrl, { query, variables }, { headers });
    }
}

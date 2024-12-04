CSV Data Set Elements and JSON Structure for the results shown on UI
Classification	
Name	
Prefix	
First	
Middle	
Last	
Suffix	
Address 1	
Address 2	
Address 3	
Address 4	
City	
State / Province	
Country	Zip Code	
Open Data Flag	Blank (Deprecated)	
Unique Entity ID	
Exclusion Program	
Excluding Agency	
CT Code	
Exclusion Type	
Additional 
Comments	
Active Date	
Termination Date	
Record Status	
Cross-Reference	
SAM Number	
CAGE	
NPI	
Creation_Date

JSON
{
  "Classification": {},
  "Name": {},
  "Prefix": {},
  "First": {},
  "Middle": {},
  "Last": {},
  "Suffix": {},
  "Address": {},
  "City": {},
  "State/ Province": {},
  "Country": {},
  "Open": "2024-12-04T03:28:35.866Z",
  "Unique": {},
  "Exclusion Program": {},
  "Excluding ": {},
  "CT": {},
  "Additional": {},
  "Comments": {},
  "Active": "2024-12-04T03:28:35.866Z",
  "Termination": "2024-12-04T03:28:35.866Z",
  "Record": "",
  "Cross-Reference": {},
  "SAM": 0,
  "CAGE": {},
  "NPI": {},
  "Creation_Date": {}
}

Approach I - Simplified Architecture

Users: Access the application through the Angular web component.
Angular Web App: Interacts directly with AppSync to query or fetch data.
AWS AppSync: Manages GraphQL APIs and interacts directly with:
Amazon OpenSearch: For indexing and querying SAM data.
AWS S3: For storing raw SAM data.


GraphQL structure

type SAMRecord {
    id: ID!
    SAM: String
    CT: String
    cageCode: String
    Classification: String	
    Name	
    Prefix	
    First	
    Middle	
    Last	
    Suffix	
    Address 1	
    Address 2	
    Address 3	
    Address 4	
    City	
    State / Province	
    Country	Zip Code	
    Open Data Flag	Blank (Deprecated)	
    Unique Entity ID	
    Exclusion Program	
    Excluding Agency	
    CT Code	
    Exclusion Type	
    Additional 
    Comments	
    Active Date	
    Termination Date	
    Record Status	
    Cross-Reference	
    SAM Number	
    CAGE	
    NPI	
    Creation_Date
}

type Query {
    searchSAM(query: String!): [SAMRecord]
}

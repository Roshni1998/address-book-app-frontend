import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string = "http://localhost:8080/addressbookservice";

  constructor(private httpClient: HttpClient) { }

  getAddressBookData(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/get");
  }
}

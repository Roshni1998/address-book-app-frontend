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

  addNewContact(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/addnewcontact", body);
  }

  deleteContact(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/delete/" + id);
  }

  updateContact(id: number, body: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/updatecontact/" + id, body);
  }

}

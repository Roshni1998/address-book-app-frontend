import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public personDetails: AddressBook[] = [];

  constructor(private httpService: HttpService, 
              private router: Router,) { }

  ngOnInit(): void {
    this.httpService.getAddressBookData().subscribe(data => {
      this.personDetails = data.data;
      console.log(this.personDetails);
    } );
  }

}

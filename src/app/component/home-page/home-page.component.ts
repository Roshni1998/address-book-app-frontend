import { Component, OnInit } from '@angular/core';
import { AddressBook } from 'src/app/model/address-book';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public personDetails: AddressBook[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

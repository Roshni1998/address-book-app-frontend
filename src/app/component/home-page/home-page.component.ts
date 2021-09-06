import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { HttpService } from 'src/app/service/http.service';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public personDetails: AddressBook[] = [];

  constructor(private httpService: HttpService, 
              private router: Router,
              private dataService: DataService,
              private snackBar: MatSnackBar,
              private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.httpService.getAddressBookData().subscribe(data => {
      this.personDetails = data.data;
      console.log(this.personDetails);
    } );
  }

  remove(id: number): void {
    console.log(id);
    this.httpService.deleteContact(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
      // this.snackBar.open('Contact Deleted Successfully!', '', {duration: 4000, verticalPosition: 'top'});
      this.notifierService.showNotification('Contact Deleted Successfully!', '', 'delete');
    });
  }

  update(person: AddressBook): void {
    this.dataService.changePerson(person);
    this.router.navigateByUrl('/add-user/' + person.id);
    this.httpService.updateContact(person.id, person).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

}

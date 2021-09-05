import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public person: AddressBook = new AddressBook();

  personFormGroup: FormGroup

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private snackBar: MatSnackBar) { 
                this.personFormGroup = this.formBuilder.group({
                  fullName: new FormControl(''),
                  address: new FormControl(''),
                  city: new FormControl(''),
                  state: new FormControl(''),
                  zipNo: new FormControl(''),
                  phoneNumber: new FormControl('')
                });
              }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id'] != undefined) {
      this.dataService.currentPerson.subscribe(person => {
        if(Object.keys(person).length !== 0) {
          console.log(person);
          this.personFormGroup.get('fullName').setValue(person.fullName);
          this.personFormGroup.get('address').setValue(person.address);
          this.personFormGroup.get('city').setValue(person.city);
          this.personFormGroup.get('state').setValue(person.state);
          this.personFormGroup.get('zipNo').setValue(person.zipNo);
          this.personFormGroup.get('phoneNumber').setValue(person.phoneNumber);
        }
      });
    }
  }

  onSubmit() {
  this.person = this.personFormGroup.value;
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.httpService.updateContact(this.activatedRoute.snapshot.params['id'], this.person).subscribe(response => {
        console.log(response);
        this.ngOnInit();
        this.router.navigateByUrl("/home-page");
        this.snackBar.open('Updated Successfully!', 'OK', {duration: 4000, verticalPosition: 'top'});
      });
    }else {
      this.httpService.addNewContact(this.person).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl("/home-page");
        this.snackBar.open('New Person Added Successfully!', 'OK', {duration: 4000, verticalPosition: 'top'});
      });
    }
  }
}

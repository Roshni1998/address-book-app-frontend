import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { NotifierService } from 'src/app/notifier.service';
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
              private snackBar: MatSnackBar,
              private notifierService: NotifierService) { 
                this.personFormGroup = this.formBuilder.group({
                  fullName: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
                  address: new FormControl('', Validators.required),
                  city: new FormControl('', Validators.required),
                  state: new FormControl('', Validators.required),
                  zipNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")]),
                  phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(6|7|8|9)?[0-9]{9}$")])
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

  public checkError = (controlName: string, errorName: string) => {
    return this.personFormGroup.controls[controlName].hasError(errorName);
  }

  onSubmit() {
  this.person = this.personFormGroup.value;
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.httpService.updateContact(this.activatedRoute.snapshot.params['id'], this.person).subscribe(response => {
        console.log(response);
        this.ngOnInit();
        this.router.navigateByUrl("/home-page");
        this.notifierService.showNotification('Contact Updated Successfully!', '', 'success');
      });
    }else {
      this.httpService.addNewContact(this.person).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl("/home-page");
        this.notifierService.showNotification('New Person Added Successfully!', '', 'success');
      });
    }
  }
}

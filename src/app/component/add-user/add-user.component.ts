import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public person: AddressBook = new AddressBook();
  personFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { 
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
  }

}

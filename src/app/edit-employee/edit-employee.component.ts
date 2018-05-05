import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../employee.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  subscription: any;
  editEmployeeForm: FormGroup;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.buildEditEmployeeForm();
    let employeeId: any;
    this.subscription = this.activatedRoute.params.subscribe(params => {
      employeeId = +params['id'];
    });

    //Populate the details in the edit form
    let employeeList: Array<any> = this.employeeService.employees.data;
    if (employeeList.length) {
      let presentObj: any = _.find(employeeList, (obj) =>{return obj.id == employeeId;});
      if (presentObj) {
        this.editEmployeeForm.controls['id'].setValue(presentObj.id);
        this.editEmployeeForm.controls['name'].setValue(presentObj.name);
        this.editEmployeeForm.controls['phone'].setValue(presentObj.phone);
        this.editEmployeeForm.controls['city'].setValue(presentObj.address.city);
        this.editEmployeeForm.controls['address_line1'].setValue(presentObj.address.address_line1);
        this.editEmployeeForm.controls['address_line2'].setValue(presentObj.address.address_line2);
        this.editEmployeeForm.controls['postal_code'].setValue(presentObj.address.postal_code);
      }
    }
  }

  //Build edit employee form.
  buildEditEmployeeForm() {
    this.editEmployeeForm = this.formBuilder.group({
      id: this.formBuilder.control('', []),
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      phone: this.formBuilder.control('', [Validators.required]),
      city: this.formBuilder.control('', []),
      address_line1: this.formBuilder.control('', []),
      address_line2: this.formBuilder.control('', []),
      postal_code: this.formBuilder.control('', [])
    })
  }

  // Save edit employee form.
  editEmployee(value: any) {
    let employeeList: Array<any> = this.employeeService.employees.data;
    if (employeeList.length) {
      employeeList.forEach(item => {
        if (item.id === value.id) {
          item.name = value.name;
          item.phone = value.phone;
          item.address.city = value.city;
          item.address.address_line1 = value.address_line1;
          item.address.address_line2 = value.address_line2;
          item.address.postal_code = value.postal_code;
        }
      });
    }
    this.router.navigateByUrl('/employees');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

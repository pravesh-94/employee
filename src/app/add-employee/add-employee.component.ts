import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

  addEmployeeForm: FormGroup;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.buildAddEmployeeForm();
  }

  //Build add employee form
  buildAddEmployeeForm() {
    this.addEmployeeForm = this.formBuilder.group({
      id: this.formBuilder.control('', []),
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      phone: this.formBuilder.control('', [Validators.required]),
      city: this.formBuilder.control('', []),
      address_line1: this.formBuilder.control('', []),
      address_line2: this.formBuilder.control('', []),
      postal_code: this.formBuilder.control('', [])
    })
  }

  // Save employee details.
  addEmployee(value: any) {
    let employeeLength: number = this.employeeService.employees.data.length;
    const employee: any = {
      "id": employeeLength + 1,
      "name": value.name,
      "phone": value.phone,
      "address":
        {
          "city": value.city,
          "address_line1":value.address_line1,
          "address_line2":value.address_line2,
          "postal_code":value.postal_code
        }
      }
    this.employeeService.addEmployee(employee);
    this.router.navigate(['/employees']);
  }
}

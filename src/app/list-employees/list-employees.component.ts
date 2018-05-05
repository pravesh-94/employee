import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employeeList: Array<any> = [];
  originalEmployeeList: Array<any> = [];
  isSorted: Boolean = false;
  sortColumnName: string = null;

  constructor(private router: Router,
    private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.originalEmployeeList = this.employeeService.employees.data;
    this.employeeList = [...this.originalEmployeeList];

    //Display phone number which has characters as NA.
    this.employeeList.forEach(item => {
      if (item.phone.match(/[a-z]/i)) {
        item.phone = 'NA';
      }
    });
  }

  // Sort employee list in ascending and descending order and display the result.
  sortEmployees(sortColumn: string) {
    console.log("sortColumn:", sortColumn);
    console.log("this.sortColumnName:", this.sortColumnName);
    if (this.sortColumnName != sortColumn) {
      this.isSorted = false;
    }
    this.sortColumnName = sortColumn;
    let sortOrder: string;
    if (this.isSorted) {
      sortOrder = 'desc';
    } else {
      sortOrder = 'asc';
    }
    this.isSorted = !this.isSorted;
    this.employeeList = _.orderBy(this.employeeList, [sortColumn], [sortOrder]);
  }

  // Search the employee and display the result.
  searchEmployee(event: any) {
    if (event.target.value) {
      let value = event.target.value.toLowerCase();
      this.employeeList = _.filter(this.originalEmployeeList, (obj) => {
        if (obj.name.toLowerCase().indexOf(value) != -1 || obj.address.city.toLowerCase().indexOf(value) != -1) {
          return obj;
        }
      })
    } else {
      this.employeeList = [...this.originalEmployeeList];
    }
  }

  // Navigate to add employee page.
  addEmployee() {
    this.router.navigate(['employees/add']);
  }

  // Navigate to edit employee page.
  editEmployee(item: any) {
    this.router.navigate(['/employees/'+ item.id +'/edit']);
  }
}

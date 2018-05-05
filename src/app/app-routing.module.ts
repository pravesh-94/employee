import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {ListEmployeesComponent} from "./list-employees/list-employees.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";


const appRoutes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: ListEmployeesComponent },
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/:id/edit', component: EditEmployeeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

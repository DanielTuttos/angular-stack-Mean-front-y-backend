import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
          M.toast({ html: 'Actualizado satisfactoriamente' });
          this.getEmployees();
        })
    } else {
      //console.log(form.value);
      this.employeeService.postEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);

          M.toast({ html: 'Guardado satisfactoriamente' });

          this.getEmployees();
          //console.log(res);
        })
    }
  }

  editEmployee(employee: Employee) {

    this.employeeService.selectedEmployee = employee;

  }

  deleteEmployee(_id: string) {
    if (confirm('Estas seguro que desea elinimar el registro')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          console.log(res);
          this.getEmployees();
          M.toast({ html: 'Eliminado satisfactoriamente' });
        })
    }
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];

        console.log(res);
      });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee!: Employee;
  employeeId!: number;
  deleteEmployee!: Employee;
  jobDescription!: string;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
    });
    console.log("ID : ", this.employeeId);
    this.getEmployeeById(this.employeeId);
  }

  public getEmployeeById(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (response: Employee) => {
        this.employee = response;
        console.log('Employee :', this.employee);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public editEmployeeModal(employee: Employee): void {
    document.getElementById("edit-employee-form")?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployeeById(employee.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  editJobDescriptionModal() {
    document.getElementById("edit-employee-description-form")?.click();
    this.employee.jobDescription = this.jobDescription;
    this.employeeService.updateEmployee(this.employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployeeById(this.employee.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteEmployeeModal(employeeId: number) {
    document.getElementById("delete-employee-form")?.click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.router.navigate(['/employees']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public openEditEmployeeModal(employee: Employee) {
    this.employee = employee;
  }

  public openDeleteEmployeeModal(employee: Employee) {
    this.deleteEmployee = employee;
  }
  
}

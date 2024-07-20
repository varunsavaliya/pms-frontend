import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../models/interfaces/clients/clients.interface';
import { ClientsRepository } from '../../repositories/clients/clients.repository';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { IPlan } from '../../models/interfaces/plans/plan.interface';
import { PlansRepository } from '../../repositories/plans/plans.repository';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule,
    MatButtonModule, CommonModule, MatSelectModule, MatTableModule, RouterModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  submissionForm: FormGroup;
  clients: IClient[] = [];
  plans: IPlan[] = [];
  displayedColumns: string[] = ['name', 'planName', 'startDate', 'endDate', 'duration'];

  constructor(private clientsRepository: ClientsRepository, private plansRepository: PlansRepository) { }

  ngOnInit() {
    this.#initializeForm();
    this.#getAllSubmission();
    this.#getAllPlans();
    this.#addListener();
  }

  onSubmit() {
    if (this.submissionForm.valid) {
      this.clientsRepository.createSubmission(this.submissionForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.#getAllSubmission()
        },
        error: (err) => {
          console.log(err);

        }
      })
      console.log('Form Submitted', this.submissionForm.value);
    }
  }

  calculateEndDate(startDate: Date, duration: string): Date {
    const date = new Date(startDate);
    switch (duration) {
      case '1_month':
        date.setMonth(date.getMonth() + 1);
        break;
      case '3_months':
        date.setMonth(date.getMonth() + 3);
        break;
      case '6_months':
        date.setMonth(date.getMonth() + 6);
        break;
      case '1_year':
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        break;
    }
    return date;
  }

  #addListener() {
    this.submissionForm.controls['plan'].valueChanges.subscribe(
      (value) => {
        if (!this.submissionForm.controls['plan'].value) return undefined;
        const plan = this.plans.find(p => p.id === +this.submissionForm.controls['plan'].value)
        if (!plan) return undefined;
        this.submissionForm.controls['price'].setValue(plan.price)
      }
    )
    this.submissionForm.controls['startDate'].valueChanges.subscribe(
      (value) => {
        if (!this.submissionForm.controls['startDate'].value || !this.submissionForm.controls['plan'].value) return undefined;
        const plan = this.plans.find(p => p.id === +this.submissionForm.controls['plan'].value)
        if (!plan) return undefined;
        this.submissionForm.controls['endDate'].setValue(this.calculateEndDate(this.submissionForm.controls['startDate'].value, plan.duration))
      }
    )
  }

  #getAllPlans() {
    this.plansRepository.getAllPlans().subscribe({
      next: (res) => {
        if (res.success) {

          console.log(res);
          this.plans = res.data
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  #getAllSubmission() {
    this.clientsRepository.getAllSubmission().subscribe({
      next: (res) => {
        if (res.success) {

          console.log(res);
          this.clients = res.data
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  #initializeForm(): void {
    this.submissionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      plan: new FormControl('', Validators.required),
      startDate: new FormControl(new Date(), Validators.required),
      endDate: new FormControl({ value: undefined, disabled: true }),
      price: new FormControl({ value: undefined, disabled: true })
    });
  }
}

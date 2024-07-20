import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlansRepository } from '../../repositories/plans/plans.repository';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { IPlan } from '../../models/interfaces/plans/plan.interface';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule,
    MatButtonModule, CommonModule, MatSelectModule, MatTableModule, RouterModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {
  @ViewChild('f') form;
  planForm: FormGroup;
  plans: IPlan[] = [];
  displayedColumns: string[] = ['name', 'price', 'duration'];

  constructor(private plansRepository: PlansRepository) { }

  ngOnInit() {
    this.#initializeForm();
    this.#getAllPlans()
  }

  onSubmit() {
    if (this.planForm.valid) {
      this.plansRepository.createPlan(this.planForm.value).subscribe({
        next: (res) => {
          this.form.resetForm();
          console.log(res);
          this.#getAllPlans()
        },
        error: (err) => {
          console.log(err);

        }
      })
      console.log('Form Submitted', this.planForm.value);
    }
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

  #initializeForm(): void {
    this.planForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      duration: new FormControl('1_month', Validators.required),
    });
  }
}

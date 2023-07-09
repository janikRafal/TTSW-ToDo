import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { InputComponent } from './input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormControlPipe } from './form-control.pipe';

@NgModule({
  declarations: [NotFoundComponent, InputComponent, FormControlPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
  ],
  exports: [NotFoundComponent, InputComponent, FormControlPipe],
})
export class SharedModule {}

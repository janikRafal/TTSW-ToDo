import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { InputComponent } from './input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormControlPipe } from './form-control.pipe';

@NgModule({
  declarations: [NotFoundComponent, InputComponent, FormControlPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CardModule,
    DividerModule,
    ButtonModule,
  ],
  exports: [NotFoundComponent, InputComponent, FormControlPipe],
})
export class SharedModule {}

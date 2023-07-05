import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotFoundComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [NotFoundComponent, InputComponent],
})
export class SharedModule {}

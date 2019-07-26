import { ContestComponent } from './contest.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ContestComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class ContestModule { }
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CheckNullPipe } from './pipes/check-null.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CheckNullPipe],
  imports: [HttpClientModule],
  exports: [HttpClientModule, CommonModule, RouterModule],
  providers: [],
})
export class SharedModule {}

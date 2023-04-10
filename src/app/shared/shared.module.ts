import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CheckNullPipe } from './pipes/check-null.pipe';

@NgModule({
  declarations: [CheckNullPipe],
  imports: [HttpClientModule],
  exports: [HttpClientModule, CommonModule, RouterModule],
  providers: [],
})
export class SharedModule {}

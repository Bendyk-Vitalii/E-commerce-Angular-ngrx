import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CheckNullPipe } from './pipes/check-null.pipe';

@NgModule({
  declarations: [CheckNullPipe],
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [],
})
export class SharedModule {}

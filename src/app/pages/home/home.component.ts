import { Component, OnInit } from '@angular/core';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public cols = 3;
  public category: string | undefined;
  public rowHeight = ROWS_HEIGHT[this.cols];
  constructor() {}

  ngOnInit(): void {}

  onColumnsCountChange(colsNumber: number) {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}

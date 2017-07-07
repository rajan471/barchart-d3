# Barchart-d3

Lightweight package for creating Bar charts using D3

Dependencies:

- D3 v4
- typescript
- moment
- @types/d3

## Installation instructions

```
npm install --save barchart-d3
```


## Usage

### Inside Component HTML

```html
<div *ngIf="chartData!=null">
    <app-barchart [data]="chartData"></app-barchart>
</div>
```
### Inside Component ts file

```ts
import { Component } from '@angular/core';
import { ChartService } from './chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  chartData: any = null;
  constructor(private chartService: ChartService) { }
  ngOnInit(){
    this.getChart();
  }
  getChart(){
    this.chartService.getChartData().subscribe((response)=>{
      this.chartData =  response;
    })
  }
}

```
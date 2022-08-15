import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from './chart/chart.component';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;




@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, DragScrollModule, NgbModule, PlotlyModule],
  declarations: [AppComponent, ChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

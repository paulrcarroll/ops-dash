import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { OpsDataService, GatewayViewModel } from '../../services/ops-data-service';
import { getDefaultBarChartOptions } from '../../utils/chart-utils';
import { GatewayCount } from '../../types/ChartDataTypes';
import { CanvasJSChart } from '@canvasjs/angular-charts';

export interface GraphDataPoint {
  label: string;
  y: number
}

@Component({
  selector: 'app-bar-volume',
  templateUrl: './bar-volume.component.html',
  styleUrl: './bar-volume.component.scss'
})
export class BarVolumeComponent {
  public gdata: GatewayCount[] = [];
  chartReady = false;
  chartData: any = [];
  @ViewChild('chart') chart!: CanvasJSChart;
  @Input() dataPoints!: GraphDataPoint[];
  @Input() yLabel: string = '';
  @Input() chartTitle?: string;
  
  chartOptions = getDefaultBarChartOptions(this.yLabel);

  constructor(opsData: OpsDataService) { }

  ngOnInit() {
    this.drawGraph();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawGraph();
  }

  drawGraph() {
    this.chartOptions.data = [];

    this.chartOptions.data.push({
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###",
      dataPoints: this.dataPoints
    });

    /*
    let svc = this.gwSvc;
    this.chartOptions.data[0].click = function (e: any) {
      var dataSeries = e.dataSeries;
      var dataPoint = e.dataPoint;
      svc.selectedGateway.next(e.dataPoint.label);
    };
    */
   
    this.chartReady = true;

    if (this.chart) {
      this.chart.chart.render();
    }
  }
}

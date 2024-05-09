import { Component, OnInit } from '@angular/core';
import { FromToDate, OpsDataService, GatewayPingData, GatewayViewModel } from '../../services/ops-data-service';
import { GatewayCount, GatewayResponseDayCount, GraphDataPoint } from '../../types/ChartDataTypes';
import { addDays } from 'src/app/utils/date-utils';
import { TableViewOptions } from 'src/app/view-table/view-table.component';

@Component({
  selector: 'app-payments-home',
  templateUrl: './payments-home.component.html',
  styleUrls: ['./payments-home.component.scss']
})
export class PaymentsHomeComponent implements OnInit {

  dateRange: FromToDate = {
    fromDate: new Date(),
    toDate: new Date()
  };

  gatewayPing: GatewayPingData[] = [];
  gatewayTotals: GatewayCount[] = [];
  gatewayTotalDataPoints: GraphDataPoint[] = [];
  gatewayResponseDayCounts: GatewayResponseDayCount[] = [];
  segmentCounts: any[] = [];
  failedCountsPct: any[] = [];
  smsFailDataPoints: GraphDataPoint[] = [];

  constructor(private opsDataService: OpsDataService) {
    this.dateRange.fromDate = this.opsDataService.fromDate;
    this.dateRange.toDate = this.opsDataService.toDate;
  }

  ngOnInit(): void {
    this.opsDataService.update(this.dateRange);

    this.opsDataService.gatewayVolume.subscribe((data) => {
      this.gatewayTotals = data;
      this.gatewayTotalDataPoints = (data.slice(0, 10)).map((g) => {
        return {
          label: g.gateway,
          y: g.count
        }
      })
    });

    this.opsDataService.responseCounts.subscribe((data) => {
      this.gatewayResponseDayCounts = data;
    });

    this.opsDataService.gatewayPing.subscribe((data) => {
      this.gatewayPing = data;
    });

    this.opsDataService.smsFailReasons().subscribe((data: any[]) => {
      this.smsFailDataPoints = data.map((r: any) => {
        return {
          label: r.reason,
          y: r.count
        }
      });
    });

    this.opsDataService.smsTopSalesSiteFailures().subscribe((data: any[]) => {
      this.failedCountsPct = data;
    });
  }

  onChangeSsid(event: any) {
    console.log('ssid: ' + event);
    this.smsFailDataPoints = [];
    this.opsDataService.smsSiteFailureData(event, addDays(new Date(), -2)).subscribe((data) => {
      console.log(data);
      this.smsFailDataPoints = data.map((r: any) => {
        return {
          label: r.reason,
          y: r.count
        }
      });
    });
  }
}

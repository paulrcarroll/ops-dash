
import { Injectable } from '@angular/core';
import { GatewayCount, GatewayResponseCount, GatewayResponseDayCount, KeyValPair, SegmentCountResponse } from '../types/ChartDataTypes';
import { Subject, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { addDays } from '../utils/date-utils';
import { environment } from 'src/environments/environment';

export interface FromToDate {
  fromDate: Date;
  toDate: Date;
}

export interface GatewayViewModel {
  dailyResponseCounts: any[];
  summedResponseCounts: any[];
  gatewayTotals: GatewayCount[];
}

export interface GatewayPingData {
  gateway: string;
  hour: number;
  minute: number;
  count: number;
}

export interface SmsViewModel {
  failedReasonCounts: any[];
  failedCountsPct: any[];
  segmentCounts: any[];
}

export interface QueryParams {
  viewName: string,
  top?: number,
  where?: any
}

@Injectable({
  providedIn: 'root',
})
export class OpsDataService {
  public selectedDateRange: Subject<FromToDate> = new Subject<FromToDate>();
  public selectedGateway: Subject<string> = new Subject<string>();
  public selectedSsid: Subject<string> = new Subject<string>();

  public gatewayVolume: Subject<GatewayCount[]> = new Subject<GatewayCount[]>();
  public gatewayPing: Subject<GatewayPingData[]> = new Subject<GatewayPingData[]>();
  public responseCounts: Subject<GatewayResponseDayCount[]> = new Subject<GatewayResponseDayCount[]>();

  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  private apiRoot = environment.apiRoot;

  constructor(private httpClient: HttpClient) { 
    this.fromDate = addDays(new Date(), - 14);
  }

  public async update(dateRange: FromToDate) {
    this.fromDate = dateRange.fromDate;
    this.toDate = dateRange.toDate;

    this.selectedDateRange.next(dateRange);
    this.gatewayPingData().subscribe();
    this.gatewayVolumeByDate().subscribe();
    this.gatewayResponseCountsByDate().subscribe();
  }

  getViewTable(params: QueryParams) {
    let httpParams = new HttpParams()
      .set('queryType', 'getViewTable')
      .set('viewName', params.viewName);

    if (params.top) httpParams.set('top', params.top);
    return this.httpClient.get<any[]>(`${this.apiRoot}/sms`, { params: httpParams });
  }

  gatewayVolumeByDate(): Observable<GatewayCount[]> {
    let params = new HttpParams()
      .set('queryType', 'volumeSummary')
      .set('startDate', this.fromDate.toLocaleDateString())
      .set('endDate', this.toDate.toLocaleDateString());

    return this.httpClient.get<GatewayCount[]>(`${this.apiRoot}/gateways`, { params: params })
    .pipe(
      tap(data => {
        this.gatewayVolume.next(data);
      })
    );
  }

  gatewayPingData(pingMinutes = 20): Observable<GatewayPingData[]> {
    let params = new HttpParams()
      .set('queryType', 'ping')
      .set('pingMinutes', pingMinutes);

    return this.httpClient.get<GatewayPingData[]>(`${this.apiRoot}/gateways`, { params: params })
      .pipe(
      tap(data => {
        this.gatewayPing.next(data);
      })
    );
  }

  gatewayResponseCountsByDate(): Observable<GatewayResponseDayCount[]> {
    let params = new HttpParams()
      .set('queryType', 'responseCountsByDay')
      .set('startDate', this.fromDate.toLocaleDateString())
      .set('endDate', this.toDate.toLocaleDateString());;

    return this.httpClient.get<GatewayResponseDayCount[]>(`${this.apiRoot}/gateways`, { params: params })
    .pipe(
      tap(data => {
        this.responseCounts.next(data);
      })
    );
  }

  smsFailReasons(): Observable<any[]> {
    let params = new HttpParams().set('queryType', 'failReasons')
    return this.httpClient.get<any[]>(`${this.apiRoot}/sms`, { params: params });
  }

  smsTopSegmentCounts(): Observable<SegmentCountResponse[]> {
    let params = new HttpParams().set('queryType', 'segmentCounts')
    return this.httpClient.get<SegmentCountResponse[]>(`${this.apiRoot}/sms`, { params: params });
  }

  smsTopSalesSiteFailures(): Observable<SegmentCountResponse[]> {
    let params = new HttpParams().set('queryType', 'topSalesSiteFailures')
    return this.httpClient.get<SegmentCountResponse[]>(`${this.apiRoot}/sms`, { params: params });
  }

  smsSiteFailureData(ssid: string, sinceDate: Date): Observable<any[]> {
    let params = new HttpParams()
      .set('queryType', 'salesSiteFailuresSinceDate')
      .set('ssid', ssid).set('sinceDate', sinceDate.toLocaleDateString());

    return this.httpClient.get<any[]>(`${this.apiRoot}/sms`, { params: params });
  }
}

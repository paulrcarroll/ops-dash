export interface GraphDataPoint {
  label: string;
  y: number
}

export interface GatewayResponseDayCount {
  gateway: string;
  actualDate: Date;
  response: string;
  count: number;
}

export interface ResponseCount {
  response: string;
  count: number;
}

export interface GatewayCount {
  gateway: string;
  count: number;
}

export interface KeyValPair {
  key: string;
  value: number;
}

export interface GatewayResponseCount {
  gateway: string;
  responses: ResponseCount[];
}

export interface SegmentCountResponse {
  salesSiteId: string;
  salesSite: string;
  communicationsProviderKey: string;
  parent: string;
  totalMsg: number;
  sumSegment: number;
  avgMsg: number;
}

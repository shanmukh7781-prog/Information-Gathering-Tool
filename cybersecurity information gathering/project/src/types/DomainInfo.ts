export interface DomainInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  asn?: string;
  isp?: string;
  threatLevel?: {
    score: number;
    factors: string[];
  };
  ports?: number[];
  lastScan?: string;
}
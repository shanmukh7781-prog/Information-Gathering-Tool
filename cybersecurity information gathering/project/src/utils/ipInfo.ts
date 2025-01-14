import axios from 'axios';
import type { DomainInfo } from '../types/DomainInfo';

export async function getIpInfo(ip: string): Promise<DomainInfo> {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    
    // Simulate additional security data (in a real app, this would come from actual security APIs)
    const threatLevel = {
      score: Math.floor(Math.random() * 100),
      factors: []
    };

    // Add risk factors based on the score
    if (threatLevel.score > 70) {
      threatLevel.factors = [
        'Multiple abuse reports',
        'Known malicious activity',
        'Suspicious network behavior'
      ];
    } else if (threatLevel.score > 30) {
      threatLevel.factors = [
        'Located in high-risk region',
        'Uncommon network configuration'
      ];
    }

    // Simulate open ports (in a real app, this would come from actual port scanning)
    const commonPorts = [21, 22, 25, 80, 443, 3306, 8080];
    const openPorts = commonPorts.filter(() => Math.random() > 0.7);

    return {
      ip: response.data.ip,
      city: response.data.city,
      region: response.data.region,
      country: response.data.country_name,
      loc: `${response.data.latitude},${response.data.longitude}`,
      org: response.data.org,
      postal: response.data.postal,
      timezone: response.data.timezone,
      asn: response.data.asn,
      isp: response.data.org,
      threatLevel,
      ports: openPorts,
      lastScan: new Date().toISOString()
    };
  } catch (error) {
    throw new Error('Failed to fetch IP information');
  }
}
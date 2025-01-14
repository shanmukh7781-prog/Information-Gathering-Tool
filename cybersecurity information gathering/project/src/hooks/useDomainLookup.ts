import { useState } from 'react';
import { resolveDomain } from '../utils/dns';
import { getIpInfo } from '../utils/ipInfo';
import type { DomainInfo } from '../types/DomainInfo';

export function useDomainLookup() {
  const [info, setInfo] = useState<DomainInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupDomain = async (domain: string) => {
    if (!domain) return;
    
    setLoading(true);
    setError('');
    setInfo(null);
    
    try {
      // First resolve the domain to an IP
      const ip = await resolveDomain(domain);
      // Then get the IP information
      const domainInfo = await getIpInfo(ip);
      setInfo(domainInfo);
    } catch (err) {
      setError('Failed to fetch domain information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { info, loading, error, lookupDomain };
}
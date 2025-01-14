import axios from 'axios';

export async function resolveDomain(domain: string): Promise<string> {
  try {
    // Using DNS resolution API
    const response = await axios.get(`https://dns.google/resolve?name=${domain}`);
    if (response.data.Answer && response.data.Answer[0]) {
      return response.data.Answer[0].data;
    }
    throw new Error('Could not resolve domain');
  } catch (error) {
    throw new Error('Failed to resolve domain');
  }
}
import { Buffer } from 'buffer';

export function parseJSON(data: string) {
  if (!data) {
    return 'No JSON here...';
  }
  try {
    const buf = Buffer.from(data, 'base64');
    return JSON.parse(buf.toString());
  } catch (error) {
    throw new Error('Klarte ikke å parse json' + error);
  }
}

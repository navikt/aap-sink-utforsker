import { Buffer } from 'buffer';

export function parseJSON(data: string) {
  if (!data) {
    return 'No JSON here...';
  }
  try {
    const buf = Buffer.from(data, 'base64');
    return JSON.parse(buf.toString());
  } catch (error) {
    console.error('Klarte ikke å parse json. ' + error);
    console.error(data);
  }
}

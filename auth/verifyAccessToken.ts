import { createRemoteJWKSet, FlattenedJWSInput, JWSHeaderParameters, jwtVerify } from 'jose';
import { GetKeyFunction } from 'jose/dist/types/types';
import { Client, Issuer } from 'openid-client';

let _issuer: Issuer<Client>;
let _remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;

export async function validerToken(token: string | Uint8Array) {
  return jwtVerify(token, await jwks(), {
    issuer: (await issuer()).metadata.issuer,
  });
}

async function jwks() {
  if (typeof _remoteJWKSet === 'undefined') {
    const iss = await issuer();
    _remoteJWKSet = createRemoteJWKSet(new URL(<string>iss.metadata.jwks_uri));
  }

  return _remoteJWKSet;
}

async function issuer() {
  if (typeof _issuer === 'undefined') {
    if (!process.env.AZURE_APP_WELL_KNOWN_URL)
      throw new Error(`Miljøvariabelen "AZURE_APP_WELL_KNOWN_URL" må være satt`);
    _issuer = await Issuer.discover(process.env.AZURE_APP_WELL_KNOWN_URL);
  }
  return _issuer;
}

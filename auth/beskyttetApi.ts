import { NextApiRequest, NextApiResponse } from 'next';
import { validateAuthorization } from './verifyAccessToken';

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;

export function beskyttetApi(handler: ApiHandler): ApiHandler {
  return async function withBearerTokenHandler(req, res) {
    function send401() {
      return res.status(401).json({ message: 'Access denied' });
    }
    function send500() {
      return res.status(500).json({ message: 'NextJS internal server error' });
    }

    try {
      if (process.env.NODE_ENV === 'development') {
        return handler(req, res);
      }

      const bearerToken: string | null | undefined = req.headers['authorization'];
      if (!bearerToken) {
        return send401();
      }
      try {
        await validateAuthorization(bearerToken);
      } catch (e) {
        return send401();
      }
      return handler(req, res);
    } catch (e) {
      return res.status(500).json({ message: 'Noe gikk galt i autentisering' });
    }
    return send500();
  };
}

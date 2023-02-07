import { beskyttetApi } from '../../auth/beskyttetApi';
import { validateAuthorization, validerToken } from '../../auth/verifyAccessToken';

const handler = beskyttetApi(async (req, res) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const token = authorization.split(' ')[1];
      const JWTVerifyResult = await validerToken(token);
      res.json({ name: JWTVerifyResult.payload.name });
    } catch (e) {
      res.status(500).send({ error: e });
    }
  }
});

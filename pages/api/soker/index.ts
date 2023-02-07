import { beskyttetApi } from '../../../auth/beskyttetApi';

const handler = beskyttetApi(async (req, res) => {
  const { sok } = req.query;
  const personIdent = req.headers['personident'];

  console.log('personIdent', personIdent);
  console.log('query', sok);

  const params = new URLSearchParams({
    antall: '1',
    retning: 'DESC',
  });

  try {
    const response = await fetch(`http://localhost:3001/søker?antall=1&retning=DESC`, {
      method: 'GET',
      headers: {
        personident: '05922049248',
        accept: 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      res.status(response.status).send(data);
    } else {
      res.status(response.status).json({ message: response.statusText });
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export default handler;

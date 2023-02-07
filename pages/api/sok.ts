import { beskyttetApi } from '../../auth/beskyttetApi';

const handler = beskyttetApi(async (req, res) => {
  const personIdent = req.headers['personident'];

  const url = process.env.NODE_ENV === 'development' ? 'localhost:3001' : 'sink';

  try {
    const response = await fetch(`http://${url}/søker?antall=${req.query.antall}&retning=${req.query.retning}`, {
      method: 'GET',
      headers: {
        personident: personIdent as string,
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

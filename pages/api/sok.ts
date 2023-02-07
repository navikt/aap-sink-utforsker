import {beskyttetApi} from '../../auth/beskyttetApi';

const handler = beskyttetApi(async (req, res) => {
  const personIdent = req.headers['personident'];

  try {
    const response = await fetch(
      `http://localhost:3001/søker?antall=${req.query.antall}&retning=${req.query.retning}`,
      {
        method: 'GET',
        headers: {
          personident: personIdent as string,
          accept: 'application/json',
        },
      }
    );

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

import nextConnect from 'next-connect';

const handler = nextConnect();

handler.get((req, res) => {
  console.log(req.gameID);
  if (req.gameID) {
    console.log(req.gameID);
    res.send('success')
  }

  // if (req.query.gameID) {
  //   return res.status(200).send('');
  // }

  // let mlbAPI_Response;

  // try {
  //   axios
  //     .get(
  //       `https://statsapi.mlb.com/api/v1.1/game/${req.query.gameID}/feed/live`
  //     )
  //     .then((r) => (mlbAPI_Response = r.data));

  //   console.log(mlbAPI_Response);

  //   // res.json({ data: mlbAPI_Response.data });
  // } catch {
  //   res.send('Server Error');
  // }

  // return res.status(200).json({ data: mlbAPI_Response.data });
});

export default handler;

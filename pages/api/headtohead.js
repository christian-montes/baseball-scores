import nextConnect from 'next-connect';
import axios from 'axios';

const handler = nextConnect();

handler.get(async (req, res) => {
  const homeID = req.query.homeID;
  const awayID = req.query.awayID;

  if (homeID === '0' || awayID === '0') {
    res.status(200).json('Awaiting input..');
  } else {
    const homeURL = `http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${homeID}/schedule`;

    const { data: homeSchedule } = await axios.get(homeURL);

    const seasonSeries = homeSchedule['events'].filter((game) => {
      return (
        game['competitions'][0]['competitors'][1]['id'] === awayID ||
        game['competitions'][0]['competitors'][0]['id'] === awayID
      );
    });

    // calculating who is leading the season series
    const gamesWon = {
      [homeID]: { abbrev: '', games: 0 },
      [awayID]: { abbrev: '', games: 0 },
    };
    seasonSeries.map((game) => {
      if (game['competitions'][0]['status']['type']['completed']) {
        for (const team of game['competitions'][0]['competitors']) {
          gamesWon[team.id].abbrev = team.team.abbreviation;
          // console.log(team['team']['abbreviation'])
          if (team.winner) {
            gamesWon[team.id].games++;
          }
        }
      }
    });

    const seriesState =
      gamesWon[homeID]['games'] > gamesWon[awayID]['games']
        ? `${gamesWon[homeID]['abbrev']} leads series ${gamesWon[homeID]['games']}-${gamesWon[awayID]['games']}`
        : gamesWon[awayID]['games'] > gamesWon[homeID]['games']
        ? `${gamesWon[awayID]['abbrev']} leads series ${gamesWon[awayID]['games']}-${gamesWon[homeID]['games']}`
        : `Series tied ${gamesWon[homeID]['games']}-${gamesWon[awayID]['games']}`;

    // console.log(seriesState);

    delete homeSchedule['events'];

    const returnData = {
      ...homeSchedule,
      series: seasonSeries,
      state: seriesState,
    };

    res.status(200).json(returnData);
  }
});

export default handler;

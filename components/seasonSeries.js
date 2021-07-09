import getID from '../lib/teamIndex';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SeriesGame from './seriesGame';

export default function SeasonSeries({ away, home }) {
  const [seriesData, setData] = useState(null);
  const homeID = getID(home);
  const awayID = getID(away);

  // const { data } = axios.get(
  //   `http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${homeID}/schedule`
  // ).then(res => res.data);
  useEffect(async () => {
    const data = await axios
      .get('/api/headtohead', {
        params: {
          homeID,
          awayID,
        },
      })
      .then((res) => res.data);

    setData(data);
  }, []);

  if (!seriesData) return <div>Awaiting data</div>;

  const entries = seriesData['series'].map((game, index) => {
    return <SeriesGame key={index} gameData={game} gameNum={index + 1} />;
  });

  // console.log(seriesData);

  const seriesContainerStyle = {
    backgroundColor: '#405259',
    padding: '10px',
    borderRadius: '10px',
  };

  return (
    <>
      <div style={seriesContainerStyle}>
        <div
          id="season-series-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
          }}
        >
          <div>Regular Season Series</div>
          <div>{seriesData['state']}</div>
        </div>
        <div id="season-series-games">{entries}</div>
      </div>
    </>
  );
}

import getID from '../lib/teamIndex';
import axios from 'axios';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import SeriesGame from './seriesGame';

import styles from '../styles/seasonSeries.module.scss';

export default function SeasonSeries({ seriesData }) {
  // if (!away || !home) return <div />;

  // if (awayID === 0 || homeID === 0) return <div>Invalid Entry</div>;

  // const [seriesData, setData] = useState(null);
  // const [homeTeam, setHomeTeam] = useState(home);
  // const [awayTeam, setAwayTeam] = useState(away);

  // const homeID = getID(homeTeam);
  // const awayID = getID(awayTeam);

  // useImperativeHandle(ref, () => ({
  //   updateHomeTeam(tm) {
  //     setHomeTeam(tm);
  //   },
  //   updateAwayTeam(tm) {
  //     setAwayTeam(tm);
  //   },
  // }));
  // console.log(homeTeam, awayTeam)

  // const { data } = axios.get(
  //   `http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${homeID}/schedule`
  // ).then(res => res.data);
  // useEffect(async () => {
  //   const data = await axios
  //     .get('/api/headtohead', {
  //       params: {
  //         homeID,
  //         awayID,
  //       },
  //     })
  //     .then((res) => res.data);

  //   if (typeof data === 'string') {
  //     setData(null);
  //   } else {
  //     setData(data);
  //   }
  // }, [homeTeam, awayTeam]);

  // if (!seriesData) return <div>Awaiting user input</div>;
  // console.log(typeof seriesData);
  // if (typeof seriesData === 'string') return <div />;

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
        <div id="season-series-games">
          {entries}
        </div>
      </div>
    </>
  );
}

// export default SeasonSeries;

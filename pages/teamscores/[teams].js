import { useRouter } from 'next/router';
import Image from 'next/image';
import { getAllMatchups } from '../../lib/matchups';
import axios from 'axios';
import getID from '../../lib/teamIndex';
import Layout from '../../components/layout';
import { getFileCode } from '../../lib/teamNames';
import SeasonSeries from '../../components/seasonSeries';
import styles from '../../styles/teams.module.scss';
import { useEffect } from 'react';

export async function getStaticPaths() {
  const paths = getAllMatchups().slice(0, 10);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let teams;
  let awayTeamID;
  let homeTeamID;

  let homeURL;
  let homeSchedule;

  try {
    teams = params.teams.split('_');
    awayTeamID = getID(teams[0].replace(/-/g, ' '));
    homeTeamID = getID(teams[1].replace(/-/g, ' '));
    homeURL = `http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${homeTeamID}/schedule`;
    homeSchedule = await axios.get(homeURL).then((res) => res.data);
    // console.log(params.teams, teams, awayTeamID, homeTeamID);
  } catch {
    return {
      redirect: {
        destination: '/scores',
        permanent: false,
        // statusCode: 301
      },
    };
  }
  // const homeSchedule = await axios.get(homeURL).then((res) => res.data);
  //   matchupData = fetch(
  //     `/api/headtohead/?awayTeamID=${awayTeamID}&homeTeamID=${homeTeamID}`,
  //     {
  //       method: 'GET',
  //     }
  //   ).then((data) => data.json());

  const seasonSeries = homeSchedule['events'].filter((game) => {
    return (
      game['competitions'][0]['competitors'][1]['id'] == awayTeamID ||
      game['competitions'][0]['competitors'][0]['id'] == awayTeamID
    );
  });

  // calculating who is leading the season series
  let awayAbbrev;
  let homeAbbrev = homeSchedule['team']['abbreviation'];

  if (
    seasonSeries[0]['competitions'][0]['competitors'][0]['id'] == homeTeamID
  ) {
    awayAbbrev =
      seasonSeries[0]['competitions'][0]['competitors'][1]['team'][
        'abbreviation'
      ];
  } else {
    awayAbbrev =
      seasonSeries[0]['competitions'][0]['competitors'][0]['team'][
        'abbreviation'
      ];
  }

  // console.log(homeAbbrev, awayAbbrev);
  const gamesWon = {
    [homeTeamID]: { abbrev: homeAbbrev, games: 0 },
    [awayTeamID]: { abbrev: awayAbbrev, games: 0 },
  };

  seasonSeries.map((game) => {
    if (game['competitions'][0]['status']['type']['completed']) {
      for (const team of game['competitions'][0]['competitors']) {
        // gamesWon[team.id].abbrev = team.team.abbreviation;
        // console.log(team['team']['abbreviation'], 3)
        if (team.winner) {
          gamesWon[team.id].games++;
        }
      }
    }
  });

  const allGamesPlayed =
    gamesWon[homeTeamID]['games'] + gamesWon[awayTeamID]['games'] ===
    seasonSeries.length;

  const seriesState =
    gamesWon[homeTeamID]['games'] > gamesWon[awayTeamID]['games']
      ? allGamesPlayed
        ? `${gamesWon[homeTeamID]['abbrev']} won series ${gamesWon[homeTeamID]['games']}-${gamesWon[awayTeamID]['games']}`
        : `${gamesWon[homeTeamID]['abbrev']} leads series ${gamesWon[homeTeamID]['games']}-${gamesWon[awayTeamID]['games']}`
      : gamesWon[awayTeamID]['games'] > gamesWon[homeTeamID]['games']
      ? allGamesPlayed
        ? `${gamesWon[awayTeamID]['abbrev']} won series ${gamesWon[awayTeamID]['games']}-${gamesWon[homeTeamID]['games']}`
        : `${gamesWon[awayTeamID]['abbrev']} leads series ${gamesWon[awayTeamID]['games']}-${gamesWon[homeTeamID]['games']}`
      : `Series tied ${gamesWon[homeTeamID]['games']}-${gamesWon[awayTeamID]['games']}`;

  // if (gamesWon[homeTeamID]['games'] > gamesWon[awayTeamID]['games']) {
  //   if (allGamesPlayed) {
  //     `${gamesWon[homeTeamID]['abbrev']} won series ${gamesWon[homeTeamID]['games']}-${gamesWon[awayTeamID]['games']}`;
  //   } else {
  //     `${gamesWon[homeTeamID]['abbrev']} leads series ${gamesWon[homeTeamID]['games']}-${gamesWon[awayTeamID]['games']}`;
  //   }
  // } else if (gamesWon[awayTeamID]['games'] > gamesWon[homeTeamID]['games']) {
  //   if (allGamesPlayed) {
  //     `${gamesWon[awayTeamID]['abbrev']} leads series ${gamesWon[awayTeamID]['games']}-${gamesWon[homeTeamID]['games']}`;
  //   } else {
  //     `${gamesWon[awayTeamID]['abbrev']} leads series ${gamesWon[awayTeamID]['games']}-${gamesWon[homeTeamID]['games']}`;
  //   }
  // } else {
  //   `Series tied ${gamesWon[homeTeamID]['games']}-${gamesWon[awayTeamID]['games']}`;
  // }
  // console.log(seriesState);

  delete homeSchedule['events'];
  // console.log(seasonSeries.length, allGamesPlayed);

  const matchupData = {
    ...homeSchedule,
    series: seasonSeries,
    state: seriesState,
  };

  const teamNames = teams.map((team) => {
    return team.replace(/-/g, ' ');
  });

  return {
    props: {
      matchupData,
      awayCode: getFileCode(awayAbbrev),
      homeCode: getFileCode(homeAbbrev),
      teamNames,
    },
  };
}

export default function ViewSeries({
  matchupData,
  awayCode,
  homeCode,
  teamNames,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!matchupData) {
    router.push('/scores');
  }

  // const entries = matchupData['series'].map((game, index) => {
  //   return <SeriesGame key={index} gameData={game} gameNum={index + 1} />;
  // });

  return (
    <Layout>
      <main className={styles.body}>
        {/* <div>{`Season series between ${teamNames[0]} and ${teamNames[1]}`}</div> */}
        <div className={styles.logos}>
          <span className={styles.teamString}>{teamNames[0]}</span>
          <Image
            src={`/${awayCode}.svg`}
            alt={teamNames[0]}
            width={50}
            height={50}
          />{' '}
          <span className={styles.vsText}>&nbsp; vs. &nbsp;</span>{' '}
          <Image
            src={`/${homeCode}.svg`}
            alt={teamNames[1]}
            width={50}
            height={50}
          />{' '}
          <span className={styles.teamString}>{teamNames[1]}</span>
        </div>
        <div>
          <SeasonSeries seriesData={matchupData} />
        </div>
        <div style={{ fontStyle: 'italic', marginTop: '1rem' }}>
          If series data is not up to date, refresh the page for the most
          up-to-date data
        </div>
      </main>
    </Layout>
  );

  // let matchups = getAllMatchups();

  // console.log(matchups.slice(0, 5));

  // console.log(router.query);
  // return <div>This</div>;
}

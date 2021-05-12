import styles from './score.module.css';
import Bases from './bases';
import Team from './team';

import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Score({ link }) {
  const gameURL = `https://statsapi.mlb.com${link}`;
  const { data } = useSWR(gameURL, fetcher, { refreshInterval: 10000 });
  console.log(data);

  // extracting the necessary data to passdown to Team component;
  if (!data) return <div>Loading...</div>;
  const {
    gameData: {
      teams: { away: awayData, home: homeData },
    },
    liveData: {
      linescore: {
        teams: {
          home: { runs: runsHome },
          away: { runs: runsAway },
        },
      },
    },
  } = data;
  // console.log(gameURL);

  return (
    <div
      className="score container py-1"
      style={{ border: '1px solid lightgrey' }}
    >
      <div className="row" style={{ height: '4rem' }}>
        <div className="col-7 col-sm-6">
          <Team away teamData={awayData} runsScored={runsAway}/>
          <Team teamData={homeData} runsScored={runsHome}/>
          {/* <Team teamData={homeData} /> */}
          {/* <div 
            className='row h-50 align-items-center' 
            style={{paddingBottom: '0px', marginBottom: '0px'}}>
            <div className='col-2 px-1'>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faBaseballBall} />
              </span>
            </div>
            <div className='col-8 h-100 ps-2.5'>
              <div 
                className='row h-50' 
                style={{fontSize: '13px', paddingBottom: '0px'}}>
                Team 1
              </div>
              <div 
                className='row h-50' 
                style={{fontSize: '10px', paddingBottom: '0px'}}>
                Record
              </div>
            </div>
            <div className='col-2 ps-0'>
              5
            </div>
          </div> */}
          {/* <div 
            className='row h-50 align-items-center' 
            style={{paddingTop: '0px', marginTop: '0px'}}>
            <div className='col-2 px-1'>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faBaseballBall} />
              </span>
            </div>
            <div className='col-8 h-100 ps-2.5'>
              <div 
                className='row h-50' 
                style={{fontSize: '13px', paddingBottom: '0px'}}>
                Team 2
              </div>
              <div 
                className='row h-50' 
                style={{fontSize: '10px', paddingTop: '0px'}}>
                Record
              </div>
            </div>
            <div className='col-2 ps-0'>
              2
            </div>
          </div> */}
          {/* <div className='d-flex flex-row h-50 justify-content-between' style={{border: '1px solid blue'}}>
            <div>
              <span className={styles.icon}><FontAwesomeIcon icon={faBaseballBall} /></span>
            </div>
            <div>
              Score
            </div>
          </div> */}
        </div>

        <div className="col pe-0 h-100 position-relative">
          <div className="position-absolute top-50 end-50 translate-middle pe-0">
            <Bases />
          </div>
          <div className="position-absolute pe-2 top-0 end-0">Inning</div>
        </div>
      </div>
    </div>
    // <>
    //   <div className='container position-relative col-sm-4 mt-5'
    //     style={{border: '1px solid lightgrey', height: '4rem'}}>
    //     {/* <div className='position-relative'> */}
    //       <div className='position-absolute top-0 start-0'>
    //         Team 1 Record 1
    //       </div>
    //       <div className='position-absolute top-0 end-50'>
    //         Score 1
    //       </div>
    //       <div className='position-absolute bottom-0 start-0'>
    //         Team 2
    //       </div>
    //       <div className='position-absolute bottom-0 end-50'>
    //         Score 2
    //       </div>
    //       <div className='position-absolute top-50 start-50 ps-5 ms-3 translate-middle'>
    //         Bases
    //       </div>
    //       <div className='position-absolute top-0 end-0 pe-2'>
    //         Inning
    //       </div>
    //     {/* </div> */}
    //   </div>
    // </>
  );
}

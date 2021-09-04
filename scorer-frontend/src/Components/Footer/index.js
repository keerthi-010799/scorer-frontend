import React from 'react';
import teams from '../../assets/group.svg';
import matches from '../../assets/cricket.svg';
import players from '../../assets/player.svg';
import { useHistory, useRouteMatch } from 'react-router-dom';

export default function Footer() {
  const history = useHistory();
  const match = useRouteMatch();

  const redirectTo = (route) => {
    history.push(route);
  };

  return (
    <div className='footer'>
      <div className='menubar d-flex align-items-center text-center'>
        <div
          className={`menuitem p-2 ${match && match.path === '/teams' ? 'selected' : ''}`}
          onClick={() => redirectTo('/teams')}
        >
          <div>
            <img src={teams} alt="" style={{ width: '50px',cursor:"pointer" }} />
          </div>
          <div>Teams</div>
        </div>
        <div
          className={`menuitem p-2 ${match && match.path === '/matches' ? 'selected' : ''}`}
          onClick={() => redirectTo('/matches')}
        >
          <div>
            <img src={matches} alt="" style={{ width: '50px',cursor:"pointer" }} />
          </div>
          <div>Matches</div>
        </div>
        <div
          className={`menuitem p-2 ${match && match.path === '/players' ? 'selected' : ''}`}
          onClick={() => redirectTo('/players')}
        >
          <div>
            <img src={players} alt="" style={{ width: '50px',cursor:"pointer" }} />
          </div>
          <div>Players</div>
        </div>
      </div>
    </div>
  );
}

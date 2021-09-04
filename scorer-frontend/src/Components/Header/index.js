import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import ball from '../../assets/ball.svg';
import Auth from '../../context/auth-context';
import logout from '../../assets/exit.png';

export default function Header() {
  const history = useHistory();
  const redirectTo = (route) => {
    history.push(route);
  };
  const context = useContext(Auth);
  const pageLogout=()=>{
    console.log("logging out");
    context.logout();
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    redirectTo('/');
  }
  return (
      <div className='header p-2'>
       <div className='title d-flex justify-content-between align-items-center' style={{cursor:"pointer"}} onClick={() => redirectTo('/')}>
        <img src={ball} style={{ width: '18px' }} className='mr-2' alt="" />
          <div className='text-secondary'>
          SCORE<span className='text-danger'>BOARD</span>
        </div>
      </div>
      {context.token &&<div className='title ml-3 d-flex justify-content-between align-items-center p-12 ml-auto' style={{cursor:"pointer"}} onClick={pageLogout}>
        <img src={logout} style={{ width: '18px' }} className='mr-2' alt="" />
  </div>}
    </div>
);
}

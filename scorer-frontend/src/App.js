import React, { Suspense ,useState} from 'react';
import './App.scss';
import Header from './Components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBoundary from './utils/ErrorBoundary';
import Loader from './Components/Common/Loader';
import Auth from './context/auth-context';
import WinnerPage from './pages/WinnerPage';

const Login = React.lazy(() => import('./pages/login'));
const signup = React.lazy(() => import('./pages/signuppage'));
const Home = React.lazy(() => import('./pages/Home'));
const TeamList = React.lazy(() => import('./pages/TeamList'));
const Team = React.lazy(() => import('./pages/Team'));
const MatchList = React.lazy(() => import('./pages/MatchList'));
const Match = React.lazy(() => import('./pages/Match'));
const PlayerList = React.lazy(() => import('./pages/PlayerList'));
const Player = React.lazy(() => import('./pages/Player'));
const AddPlayer = React.lazy(() => import('./pages/AddPlayer'));
const AddTeam = React.lazy(() => import('./pages/AddTeam'));
const AddMatch = React.lazy(() => import('./pages/AddMatch'));
const Winner = React.lazy(() => import('./pages/WinnerPage'));




function App() {
  const currentToken = localStorage.getItem("tokens");
  const currentUserId = localStorage.getItem("user"); ;
const [token,setToken] = useState(currentToken);
const [userId,setUserId] = useState(currentUserId);
  const login = (token, userId, tokenExpiration) => {
    localStorage.setItem("tokens",token);
    localStorage.setItem("user",userId);
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
     setToken(null);
     setUserId(null)
  };


  return (
    <div className='App'>
      <ErrorBoundary>
        <Suspense fallback={<Loader status={true} />}>
          <Auth.Provider value={{
              token: token,
              userId: userId,
              login: login,
              logout: logout
            }}>
          <Router>
            <Header />
            {!token && <Route exact path='/' component={Login} />}
            {!token && <Route exact path='/signup' component={signup} />}
            {token && <Route exact path='/' component={Home} />}
            <Route exact path='/teams' component={TeamList} />
            <Route exact path='/team/info/:teamId' component={Team} />
            <Route exact path='/team/add' component={AddTeam} />
            <Route exact path='/matches/' component={MatchList} />
            <Route exact path='/match/info/:matchId' component={Match} />
            <Route exact path='/match/add' component={AddMatch} />
            <Route exact path='/players/' component={PlayerList} />
            <Route exact path='/player/info/:playerId' component={Player} />
            <Route exact path='/player/add' component={AddPlayer} />
            <Route exact path='/winner' component={Winner} />
          </Router>
          </Auth.Provider>
        </Suspense>
      </ErrorBoundary>
    </div>
      );
}

export default App;

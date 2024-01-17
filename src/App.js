import './style.scss';
import Auth from './page/Auth';
import { useState } from 'react';
import Room from './page/Room';
import { Chat } from './page/Chat';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"))
  const [room, setRoom] = useState(null)
  return (
    <div>
      {!isAuth ?
        <Auth setIsAuth={setIsAuth} /> :
        room ? <Chat room={room} setRoom={setRoom} /> : <Room setIsAuth={setIsAuth} setRoom={setRoom} />
      }
    </div>
  );
}

export default App;

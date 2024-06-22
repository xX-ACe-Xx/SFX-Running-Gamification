import { useState } from 'react';
import { useEffect } from 'react';
import { socket } from './socket';
import './App.css';
import StartPage from './views/StartPage.js';
import RunningPage from './views/RunningPage.js';
import EndPage from './views/EndPage.js';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currentStage, setStage] = useState('start');
  const [currentProgress, setProgress] = useState(0);
  const [currentBadge, setBadge] = useState(0);
  const [badgeVisibility, setBadgeVisibility] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  let currentPage = <StartPage connection={isConnected} />;

  if (currentStage === 'start') {
    currentPage = <StartPage connection={isConnected} />;
  } else if (currentStage === 'running') {
    currentPage = (
      <RunningPage
        progress={currentProgress}
        badge={currentBadge}
        badgeVisibility={badgeVisibility}
        isMoving={isMoving}
      />
    );
  } else if (currentStage === 'end') {
    currentPage = <EndPage />;
  } else {
    currentPage = <p> No valid State </p>;
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      setProgress(0);
      setBadge(0);
      setBadgeVisibility(false);
    }

    function onChangeStage(value) {
      setStage(value);
    }

    function onUpdateProgress(value) {
      setProgress(value);
    }

    function onUpdateBadge(value) {
      setBadge(value);
      setBadgeVisibility(true);
    }

    function onTreadmillMoving() {
      setIsMoving(true);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('change_stage', onChangeStage);
    socket.on('update_progress', onUpdateProgress);
    socket.on('update_badge', onUpdateBadge);
    socket.on('treadmill_moving', onTreadmillMoving);
    let interval = null;

    if (badgeVisibility === true) {
      interval = setInterval(() => {
        setBadgeVisibility(false);
      }, 5000);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('change_stage', onChangeStage);
      socket.off('update_progress', onUpdateProgress);
      socket.off('update_badge', onUpdateBadge);
      socket.off('treadmill_moving', onTreadmillMoving);
      clearInterval(interval);
    };
  }, [badgeVisibility]);

  return (
    <div className='App'>
      <div className='grid-container'>{currentPage}</div>
    </div>
  );
}

export default App;

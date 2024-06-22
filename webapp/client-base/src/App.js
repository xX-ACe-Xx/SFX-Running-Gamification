
import { useState } from 'react';
import { useEffect } from 'react';
import { socket } from './socket.js';
import './App.css';
import StartPage from './views/StartPage.js';
import RunningPage from './views/RunningPage.js';
import EndPage from './views/EndPage.js';



function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currentStage, setStage] = useState('start');
  const [isMoving, setIsMoving] = useState(false);

  let currentPage = <StartPage connection = {isConnected} />;
  
  if (currentStage === 'start'){
    currentPage = <StartPage connection = {isConnected} />;
  } else if (currentStage === 'running') {
    currentPage = <RunningPage isMoving = {isMoving}/>;
  } else if (currentStage === 'end') {
    currentPage = <EndPage/>;
  } else {
    currentPage = (<p> No valid State </p>)
  }
  
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChangeStage(value){
      setStage(value);
    }

    function onTreadmillMoving(){
      setIsMoving(true);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('change_stage', onChangeStage);
    socket.on('treadmill_moving', onTreadmillMoving);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('change_stage',onChangeStage);
      socket.off('treadmill_moving', onTreadmillMoving);
    };
  }, []);
  

  return (
    <div className="App">
      
      <div className='grid-container'>
      {currentPage}
      </div>
    </div>
  );
}

export default App;

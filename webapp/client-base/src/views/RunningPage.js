import { useState } from 'react';
import { useEffect } from 'react';
import { socket } from '../socket';
import IdleFont from '../components/IdleFont';


export default function RunningPage({isMoving}) {
  const [state, setState] = useState('idle');

  let content = <IdleFont/>;
  
  if (state === 'idle' ){
    if (isMoving){
      setState('running');
    }
  }
  
  if (state === 'running'){
    content = <h2>Run in progress</h2>;
  }

  useEffect(() => {
    if (state === 'running') {
      
      setTimeout(() => socket.timeout(5000).emit('change_stage', 'end'), 1200000);//1200000
    }
    return () => {};
  }, [state]);
    // Show the current Progress
    // Show badges when earned
    // receive and react to the Data from the Arduino
    return (
      <div className='RunningPage'>
        
        {content}
        
      </div>
    )
  }
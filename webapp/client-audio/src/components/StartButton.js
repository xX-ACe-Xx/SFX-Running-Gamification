import { socket } from '../socket';
import { useState } from 'react';

export default function StartButton({connection}) {
  const [isLoading, setIsLoading] = useState(false);

  function onClick(event) {
    event.preventDefault();
    setIsLoading(true);

  
    socket.timeout(5000).emit('change_stage', 'running', 'audio', () => {
      setIsLoading(false);
    });
  }

    return (
      <div className='StartButton'>
    
        <button onClick={onClick} disabled={ isLoading || !connection }> Continue </button>
      
      </div>
    )
  }
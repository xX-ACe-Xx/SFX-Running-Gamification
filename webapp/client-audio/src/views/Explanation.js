
import progress1 from '../sounds/p1.mp3';
import progress2 from '../sounds/p2.mp3';
import badge from '../sounds/badge.wav';
import end from '../sounds/end.wav'

export default function Explanation() {

    return (
      <div className='Explanation'>
          <div className='container-intro'>
            <p>During your run, you will have audio feedback for each distance milestone you pass. There are two different kinds of audio feedback. One is for every 125m you pass, the other is for every kilometer you pass.</p>
            <p>You can listen to an example of these sounds here:</p>
            <div className='container-audio-examples'>
              <div className='audio-example'>
              Progress level 1 - 125m
              <audio controls src={progress1}></audio>
              Progress level 2 - 250m
              <audio controls src={progress2}></audio>
            </div>
            <div className='audio-example'>
              Badge for 1 km
              <audio controls src={badge}></audio>
            </div>
            </div>
            <p>The end of your 20-minute run will be signaled by this sound:</p>
            <div className='container-audio-examples'>
              <div className='audio-example'>
                End run sound
                <audio controls src={end}></audio>
                </div>
              </div>
          </div>
      </div>
      
    )
  }
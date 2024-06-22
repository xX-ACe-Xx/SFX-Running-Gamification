import progress from '../images/progress3.svg';
import badge from '../images/badge5.svg';

export default function Explanation() {
    return (
      <div className='Explanation'>
          <div className='container-intro'>
          <p>During your run, you will have visual feedback for each distance milestone you pass. There are two different feedback elements: one is a segmented circular progress bar (left), which fills up for every 125m you pass; the other is a badge (right) for every kilometer you pass.</p>
          <p>You can see examples for these here:</p>
            <div className='container-visual-examples'>
              <div className='visual-example'>
                Progress level 3 - 375m
                <img src={progress} alt='example of the progress bar'></img>
              </div>
            
              <div className='visual-example'>
                Badge for completing a kilometer
                <img src={badge} alt='example of a badge'></img>
                </div>
            </div>
            
          </div>
      </div>
    )
  }
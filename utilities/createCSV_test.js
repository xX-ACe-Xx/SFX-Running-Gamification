const fs = require('fs');

    var statistics = {
        condition: 'visual',
        startTimestamp: new Date('2024-01-18T11:58:19.101Z'),
        progressTimestamps: [
            new Date('2024-01-18T12:00:00.815Z'),
            new Date('2024-01-18T12:01:10.828Z'),
            new Date('2024-01-18T12:02:19.102Z'),
            new Date('2024-01-18T12:03:17.508Z'),
            new Date('2024-01-18T12:04:13.926Z'),
            new Date('2024-01-18T12:05:12.266Z'),
            new Date('2024-01-18T12:06:14.370Z'),
            new Date('2024-01-18T12:07:12.580Z'),
            new Date('2024-01-18T12:08:11.861Z'),
            new Date('2024-01-18T12:09:05.152Z'),
            new Date('2024-01-18T12:10:03.751Z'),
            new Date('2024-01-18T12:11:07.751Z'),
            new Date('2024-01-18T12:11:53.950Z'),
            new Date('2024-01-18T12:12:42.018Z'),
            new Date('2024-01-18T12:13:38.789Z'),
            new Date('2024-01-18T12:14:32.170Z'),
            new Date('2024-01-18T12:15:30.766Z'),
            new Date('2024-01-18T12:16:34.702Z'),
            new Date('2024-01-18T12:17:36.853Z')
        ],
        badgeTimestamps: [ new Date('2024-01-18T12:07:14.240Z'), new Date('2024-01-18T12:14:33.961Z') ],
        totalDistance: '2466.48'
      };

    let output = 'PARTICIPANT_ID,TRIAL_NR,'+ statistics.condition ;
    output = output.concat(','+ statistics.totalDistance.toString());
    statistics.progressTimestamps.forEach( value => { output = output.concat(','+((value.getTime() - statistics.startTimestamp.getTime())/1000).toString())});
    console.log(statistics.progressTimestamps.length);
    for(let i = 0; i < (48 - statistics.progressTimestamps.length); i++){
        console.log(i);
        output = output.concat(",NA");
    }
    console.log(statistics.badgeTimestamps.length);
    statistics.badgeTimestamps.forEach( value => {output = output.concat(','+((value.getTime() - statistics.startTimestamp.getTime())/1000).toString())});
    for(let i = 0; i < (6 - statistics.badgeTimestamps.length); i++){
        console.log(i);
        output = output.concat(",NA");
    }
    console.log(output);
    fs.writeFile('test.txt', output, (err) => { 
          
        // In case of a error throw err. 
        if (err) throw err; 
      }) 

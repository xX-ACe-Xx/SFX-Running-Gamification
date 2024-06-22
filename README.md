# WebApp for testing auditory and visual gamification

The application consists of an Express Server that runs on ``Port 9000`` and uses Socket.io to communicate with the React frontend and Node SerialPort to communicate with the Arduino. It also generates the log TXT files and CSV entries for each run.  
A React app running on ``Port 3000`` is used as the frontend. Depending on the condition, either ``client-base`` for no gamification, ``client-audio`` for audio feedback or ``client-visual`` for visual feedback is used.
To track the distance, an Arduino Uno is connected via USB, more about its functionality in ``Code\arduino\README.md``

>In the current configuration, the application only works if the server and client are hosted on the same machine and the WebApp is also called on this machine under ``http://localhost:3000``.

## Folder structure

- **Code**
  - **arduino:** code that controls the sensor and communication via the serial port
  - **utilities:** various code snippets from utilities and code tests
  - **webapp**
    - **api:** Server code with Express and Socket io. Takes care of Arduino communication, generating log and CSV files, and events to control the client
    - **client-audio:** React client that implements the audio gamification
    - **client-base:** React client that implements the base condition without feedback
    - **client-visual:** React client that implements visual gamification

## Prerequisites

- Developed with Node.js ```18.18.0``` and npm ```10.2.0```
- Requires at least Node.js ```16.18.1``` and npm ```8.15.0```

### Installation

After the Git repository has been cloned, the Node modules must be installed so that the code can be executed. To do this, run ``` npm install ``` in the following folders:

``` shell
Code\webapp
Code\webapp\api
Code\webapp\client-audio
Code\webapp\client-base
Code\webapp\client-visual
```

### Usage

For serial communication to work, the Arduino must be connected to the PC hosting the server and client. The default port is ``COM3``, if another port is used, it must be changed in ```Code\webapp\api\arduino.js```:

``` js
const port = new SerialPort({
  path: 'COM3', //hier den aktuellen Port angeben
  baudRate: 9600, 
})
```

To use the WebApp, start the server code first:

``` shell
Code\webapp\api> npm start
```

After succesfull startup:

```shell
Listening on port 9000
```

Depending on the current testing condition, start either ```client-base```, ```client-audio``` or ```client-visual```:

```shell
Code\webapp\client-base> npm start
```

After succesfull startup:

```shell
You can now view client-base in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://[lokale IP-Adresse]:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

On succesfulyy establishing a connection between client and server:

```shell
client connected
```

The webapp can now be used under ``http://localhost:3000``.

### After the run

After the run has ended, you can find a Log-TXT-File in``Code\webapp\api\logs``, ehich has a nem following this pattern: ``dd-m-yyyy_hh-mm.txt`` and content like this:

```txt
Log of 18-1-2024_12-27
[12:27:23] START
[12:28:17] PROGRESS reached Progress Level 1
[12:28:53] PROGRESS reached Progress Level 2
...
[12:32:41] PROGRESS reached Progress Level 8
[12:32:41] BADGE reached Badge for kilometer 1
[12:33:19] PROGRESS reached Progress Level 1
...
[12:47:6] PROGRESS reached Progress Level 2
[12:47:26] END final distance: 4330.96
```

The ``Code\webapp\api\csv`` folder contains a ``csv_header.csv`` file in which all columns are defined:

- **participant_id:** Unique identifier of each participant, must be entered manually after the run
- **trial_nr:** run 1 or run 2, must be entered manually after the run
- **condition:** base, visual or audio
- **total_distance:** total distance in meters
- **p0_1 to p5_8:** Timestamps in seconds for each progress milestone up to 6 km. Milestones not reached are marked with NA
- **b1 to b6:** Timestamps in seconds for each badge up to 6 km. Badges not reached are marked with NA

In ```Code\webapp\api\csv\entries``` are the individual entries that are generated after each run. With the help of ``Code\utilities\concatCSV.js`` all entries in the folder can be appended to ``trials.csv`` to gradually build up a complete table with all runs.
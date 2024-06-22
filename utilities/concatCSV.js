const fs = require('fs');

const output = '../webapp/api/csv/trials.csv';
const entries = '../webapp/api/csv/entries';

fs.readdir(entries, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        const filePath = entries + '/' + file;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            fs.appendFile(output, data + '\r\n', 'utf8', (err) => {
                if (err) throw err;
            });
        });
    });
});

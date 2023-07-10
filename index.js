const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'input.csv';
const jsonFilePath = 'output.json';

const results = [];

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const jsonData = JSON.stringify(results, null, 2);
        fs.writeFile(jsonFilePath, jsonData, (error) => {
            if (error) {
                console.error('Error writing JSON file:', error);
            } else {
                console.log('JSON file written successfully!');
            }
        });
    });

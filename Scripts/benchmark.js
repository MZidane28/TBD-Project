const axios = require('axios');
const fs = require('fs');
const path = require('path');

const measureApiTime = async () => {
    const times = [];
    for (let i = 0; i < 10; i++) {
        const startTime = process.hrtime();
        try {
            await axios.get('http://localhost:3000/api/v1/Book');
        } catch (error) {
            console.error('Error during API call:', error);
        }
        const endTime = process.hrtime(startTime);
        const elapsedTime = endTime[0] * 1000 + endTime[1] / 1000000;
        times.push(elapsedTime);
    }
    fs.writeFileSync(path.join(__dirname, '../src/Book/api_times.json'), JSON.stringify(times));
    console.log('API times saved to Book/api_times.json');
};

measureApiTime();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "The Good Reading Bookstore Database",
    password: "Agar123Fku",
    port: 5432,
});

client.connect();

const query = 'SELECT * FROM Book';
const times = [];

const measureQueryTime = async () => {
    for (let i = 0; i < 10; i++) {
        const startTime = process.hrtime();
        try {
            await client.query(query);
        } catch (error) {
            console.error('Error during SQL execution:', error);
        }
        const endTime = process.hrtime(startTime);
        const elapsedTime = endTime[0] * 1000 + endTime[1] / 1000000;
        times.push(elapsedTime);
    }
    fs.writeFileSync(path.join(__dirname, '../src/Book/sql_times.json'), JSON.stringify(times));
    console.log('SQL times saved to Book/sql_times.json');
    client.end();
};

measureQueryTime();

const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const BIN = path.join(__dirname, 'worker');

if (fs.existsSync(BIN)) {
    fs.chmodSync(BIN, 0o755);
}

app.post('/run', (req, res) => {
    const { host, port, time } = req.body;
    if (!host || !port || !time) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const cmd = `${BIN} ${host} ${port} ${time} 1000`;
    exec(cmd);
    res.json({ status: 'started', target: `${host}:${port}` });
});

app.get('/ping', (req, res) => res.json({ status: 'ok' }));

app.listen(8080);

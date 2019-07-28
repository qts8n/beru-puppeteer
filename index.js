require('dotenv/config');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(`${__dirname}/${process.env.REPORT_DIR}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/${process.env.REPORT_DIR}/mochawesome.html`));
});

app.listen(process.env.PORT, () => console.log(`Test Report shows on port ${process.env.PORT}`));

/* Import the puppeteer and expect functionality of chai library for
configuraing the Puppeteer */
const path = require('path');
require('dotenv').config(path.resolve('../.env'));
const puppeteer = require('puppeteer');
const { expect, assert } = require('chai');
const cmd = require('node-cmd');
const _ = require('lodash');
const fs = require('fs');

const globalVariables = _.pick(global, ['browser', 'expect']);

const opts = {
    headless: false,
    slowMo: 10,
    timeout: 0,
    args: ['--start-maximized', '--window-size=1366,786']
}

before(async () => {
    assert.isDefined(process.env.LOGIN);
    assert.isDefined(process.env.PASSWORD);
    assert.isDefined(process.env.SCREENSHOTS_DIR);
    const screenshots = path.resolve(process.env.SCREENSHOTS_DIR);
    if (!fs.existsSync(screenshots)) {
        fs.mkdirSync(screenshots);
    }
    global.expect = expect;
    global.browser = await puppeteer.launch(opts);
});

after(async () => {
    setTimeout(() => cmd.run('node index.js'), 5000)
    browser.close();
    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
});

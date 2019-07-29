const path = require('path');
require('dotenv').config(path.resolve('../.env'));
const puppeteer = require('puppeteer');
const { expect, assert } = require('chai');
const cmd = require('node-cmd');
const _ = require('lodash');
const fs = require('fs');
const { createIfNotExists } = require('./utils');

const globalVariables = _.pick(global, ['browser', 'expect']);

const opts = {
    headless: false,
    slowMo: 100,
    timeout: 0,
    args: ['--start-maximized', '--window-size=1920,980', '--no-sandbox', '--disable-setuid-sandbox']
}

before(async () => {
    assert.isDefined(process.env.LOGIN);
    assert.isDefined(process.env.PASSWORD);
    assert.isDefined(process.env.REPORT_DIR);
    assert.isDefined(process.env.SCREENSHOTS_DIR);
    const reports = path.resolve(process.env.REPORT_DIR);
    createIfNotExists(fs, reports);
    const screenshots = path.resolve(process.env.SCREENSHOTS_DIR);
    createIfNotExists(fs, screenshots);
    global.expect = expect;
    global.browser = await puppeteer.launch(opts);
});

after(async () => {
    setTimeout(() => cmd.run('node index.js'), 5000)
    browser.close();
    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
});

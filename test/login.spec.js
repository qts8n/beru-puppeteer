const { getLinkByHref, typeIntoInput, getInnerText } = require('./utils');
const { assert } = require('chai');
const path = require('path');
const screenshots = path.resolve(process.env.SCREENSHOTS_DIR);

describe('Beru login functionality test', async () => {
    let page;

    before(async () => {
        page = await browser.newPage();
        await page.goto(process.env.HOSTNAME);
        await page.setViewport({ width: 1366, height: 768 });
    });

    after(async function () {
        await page.screenshot({ path: screenshots + '/loggedIn.png' });
        await page.close();
    });

    it('Go to Beru home page', async () => { /* simple test case */
        const loginLinkSelector = '/login',
            loginFieldSelector = '#passp-field-login',
            passwordFieldSelector = '#passp-field-passwd',
            additionalFieldSelector = '#passp-field-additional_email',
            skipButtonSelector = 'div[data-t="email_skip"]',
            profileButtonSelector = '.header2-nav__user .header2-nav-item__text';

        await page.screenshot({ path: screenshots + '/home.png' });
        const loginLinkEl = await getLinkByHref(page, loginLinkSelector);
        await loginLinkEl.click();


        const loginField = await page.waitForSelector(loginFieldSelector, { timeout: 3000 });
        await typeIntoInput(loginField, process.env.LOGIN);
        await page.screenshot({ path: screenshots + '/login.png' });
        await page.keyboard.press('Enter');

        const passwordField = await page.waitForSelector(passwordFieldSelector, { timeout: 3000 });
        await typeIntoInput(passwordField, process.env.PASSWORD);
        await page.screenshot({ path: screenshots + '/password.png' });
        await page.keyboard.press('Enter');

        try {
            const additionalField = await page.waitForSelector(additionalFieldSelector, { timeout: 3000 });
            if (additionalField !== null) {
                const skipButton = await page.$(skipButtonSelector);
                await skipButton.click();
            }
        } catch (err) {
            await page.waitFor(3000);
        }

        const profileButton = await page.waitForSelector(profileButtonSelector, { timeout: 1000 });
        assert.isNotNull(profileButton, 'Profile button exists.');
        const buttonText = await getInnerText(profileButton);
        assert.strictEqual(buttonText, 'Мой профиль');
    });
});

# beru-puppeteer
##### Automated tests for https://beru.ru website powered by Node.js and Puppeteer

### Deploy
Before deployment setup your environment.

Project uses next dependencies:
1. Node JS (^1.8.10)
2. Puppeteer JS
3. Mocha
4. Chai (Test Assertion Library)
5. node-cmd (Run Command Line Command in Node JS)
6. Express JS (Web server to serve report)
7. Mochawesome (Report generation)

Environment setup:
```bash
git clone https://github.com/qts8n/beru-puppeteer.git
cp .env.example .env
npm i
npm test
```

Before running `npm test`, make sure you set up correct Yandex credentials in
`.env` file. You can also change the screenshots directory in there. All browser
configurations will be in `test/bootstrap.js`.

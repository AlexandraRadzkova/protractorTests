const selenium = require('selenium-standalone')
const SeleniumServer = require('selenium-webdriver/remote').SeleniumServer
let server = {}
const pathToSeleniumJar = require('path').join(
        __dirname,
        'selenium-server',
        'selenium-server-standalone-3.14.0.jar',
    )

server = new SeleniumServer(pathToSeleniumJar, { port: 4444 })
return server.start()

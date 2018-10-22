exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome', 
        chromeOptions: {
            args: [
                'headless',
                'no-sandbox',
                'disable-dev-shm-usage',
            ]
        }
    },
    specs: ['integration-spec.js'],
    onPrepare: function() {
        browser.driver
            .manage()
            .window()
            .setSize(1920, 1080)
    },
}

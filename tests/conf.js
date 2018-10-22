const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter')

const reporter = new HtmlScreenshotReporter({
    dest: 'jasmineReport/screenshots',
    filename: 'jasmine_report.html',
    userJs: 'test-spec.js',
    ignoreSkippedSpecs: true,
    captureOnlyFailedSpecs: false,
    reportOnlyFailedSpecs: false,
    cleanDestination: true,
    showSummary: true,
    showQuickLinks: true,
    showConfiguration: true,
    reportTitle: 'Jasmine report',
    reportFailedUrl: true,
    pathBuilder: function(currentSpec, suites, browserCapabilities) {
        return browserCapabilities.get('browserName') + '/' + currentSpec.fullName
    },
    metadataBuilder: function(currentSpec, suites, browserCapabilities) {
        return {
            id: currentSpec.id,
            browser: browserCapabilities.get('browserName'),
            platform: 'Windows 10 Home',
        }
    },
    preserveDirectory: false,
    inlineImages: true,
})

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome', 
        chromeOptions: {
            args: [
                'headless',
                '--no-sandbox',
                '--disable-gpu',
                'disable-infobars',
                'disable-dev-shm-usage',
            ]
        }
    },
    specs: ['test-spec.js'],

    beforeLaunch: function() {
        process.on('uncaughtException', function() {
            reporter.jasmineDone()
            reporter.afterLaunch()
        })
        return new Promise(function(resolve) {
            reporter.beforeLaunch(resolve)
        })
    }, 

    onPrepare: async function() {
        await browser.driver
            .manage()
            .window()
            .setSize(1920, 1080)
        await jasmine.getEnv().addReporter(reporter)
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode))
        })
    },
}

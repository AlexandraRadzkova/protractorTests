describe('Home page', () => {
    beforeEach(() => {
        browser.get('https://www.moneysupermarket.com/')
    })

    it('Logo is on the page', () => {
        const logo = element(By.className('page-header__logo-responsive'))
        expect(logo.isPresent()).toBeTruthy()
    })

    it('checkButton', () => {
        const carInsuranceButton = element(By.xpath('//span[text()="Car Insurance"]'))
        expect(carInsuranceButton.isPresent()).toBeTruthy()
        carInsuranceButton.click()
        expect(browser.getCurrentUrl()).toContain('car-insurance')
    })

    it('try to click solar power in energy', () => {
        const energy = element(By.css('.top-navigation-container>li:nth-child(3)'))

        const solarPowerLink = element(By.xpath("//a[contains(text(),'Solar Power')]"))
        function wait(timeout) {
            return browser.wait(() => false, timeout).catch(() => {})
        }     

        browser
            .actions()
            .mouseMove(energy)
            .mouseMove(solarPowerLink)
            .click()
            .perform()
            .then(() => {
                wait(4000)
            })
        expect(browser.getCurrentUrl()).toContain('solar-power')
    })
})

describe('Form page', () => {
    browser.waitForAngularEnabled(false);
    beforeEach(() => {
        browser.get(
            'https://www.moneysupermarket.com/shop/car-insurance/questionset/your-car#?new-journey',
        )
    })

    function fillField(locate, value, key = protractor.Key.ENTER) {
        return browser.findElement(locate).then(element => element.sendKeys(value))
    }

    function wait(timeout) {
        return browser.wait(() => false, timeout).catch(() => {})
    }

    xit('Fill form', () => {
        const dateField = By.name('policyHolder.dateOfBirth.day')
        const monthField = By.name('policyHolder.dateOfBirth.month')
        const yearField = By.name('policyHolder.dateOfBirth.year')
        const kindOfDrivenLicense = By.xpath('//label[text()="Medically restricted"]')
        const currentLicenceField = By.css(
            '.year-month-selector__year-select .nativedropdown-wrapper__native',
        )

        fillField(dateField, '29')
        expect(element(dateField).getAttribute('value')).toEqual('29')

        fillField(monthField, '05')
        expect(element(monthField).getAttribute('value')).toEqual('05')

        fillField(yearField, '1998')
        expect(element(yearField).getAttribute('value')).toEqual('1998')

        fillField(currentLicenceField, '1')
        expect(element(currentLicenceField).getAttribute('value')).toEqual('number:1')

        element(kindOfDrivenLicense)
            .click()
            .then(() => wait(2000))
    })

    it('Check Continue to step 2 button text', () => {
        const continueButton = element(
            By.css('.btn__subprimary'),
        )
        expect(continueButton.getText()).toBe('Continue to next page')
    })
})

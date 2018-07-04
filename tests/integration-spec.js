describe('Integration test', () => {
    const EC = protractor.ExpectedConditions

    const logo = element(By.className('page-header__logo-responsive'))
    const carInsuranceButton = element(By.xpath('//span[text()= "Car Insurance"]'))
    const getNewQuoteButton = element(
        By.xpath("//div[contains(@class, 'landing-donk')]/a[text()=' Get a brand new quote ']"),
    )
    const carRegictrationYear = By.className('car-registration__input')
    const dateField = By.name('policyHolder.dateOfBirth.day')
    const monthField = By.name('policyHolder.dateOfBirth.month')
    const yearField = By.name('policyHolder.dateOfBirth.year')
    const kindOfDrivenLicense = By.xpath('//label[text()="Medically restricted"]')
    const currentLicenceField = By.css(
        '.year-month-selector__year-select .nativedropdown-wrapper__native',
    )
    const continueButton = element(By.className('btn btn-primary btn-continue btn-continue--alone'))

    const isClickableCarInsuranceButton = EC.elementToBeClickable(carInsuranceButton)
    const isClickableGetNewQuoteButton = EC.elementToBeClickable(getNewQuoteButton)

    it('Integration test', () => {
        browser
            .get('https://www.moneysupermarket.com/')
            .then(checkIsElementOnPage(logo))
            .then(() => browser.wait(isClickableCarInsuranceButton, 2000))
            .then(() => carInsuranceButton.click())
            //.then(() => browser.wait(EC.urlContains('car-insurance'), 1000))
            .then(() => checkUrl('car-insurance'))
            .then(() => {
                return browser.getCurrentUrl().then(currentUrl => {
                    if (!currentUrl.includes('questionset')) {
                        //expect(getNewQuoteButton.isPresent()).toBe(true)
                        browser.wait(isClickableGetNewQuoteButton, 1000)
                        return getNewQuoteButton.click()
                    }
                })
            })
            .then(() => {
                fillField(carRegictrationYear, '1753')
                expect(element(carRegictrationYear).getAttribute('value')).toEqual('1753')
            })
            .then(() => {
                fillField(dateField, '29')
                expect(element(dateField).getAttribute('value')).toEqual('29')
            })
            .then(() => {
                fillField(monthField, '05')
                expect(element(monthField).getAttribute('value')).toEqual('05')
            })
            .then(() => {
                fillField(yearField, '1998')
                expect(element(yearField).getAttribute('value')).toEqual('1998')
            })
            .then(() => {
                fillField(currentLicenceField, '1')
                expect(element(currentLicenceField).getAttribute('value')).toEqual('number:1')
            })
            .then(() => {
                element(kindOfDrivenLicense)
                    .click()
                    .then(() => wait(2000))
            })
            .then(() => {
                expect(continueButton.getText()).toBe('CONTINUE TO STEP 2')
            })
            .then(() => browser.quit())
            .catch(error => {
                browser.quit()
                console.log(error)
            })
    })
})

function fillField(locate, value, key = protractor.Key.ENTER) {
    return browser.findElement(locate).then(element => element.sendKeys(value))
}
function wait(timeout) {
    return browser.wait(() => false, timeout).catch(() => {})
}

function checkUrl(string) {
    return () => expect(browser.getCurrentUrl()).toContain(string)
}

function checkIsElementOnPage(elem) {
    return () => expect(elem.isPresent()).toBeTruthy()
}

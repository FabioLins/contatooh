exports.config = {
    specs: ['../test/e2e/**/*.js'],
    onPrepare: function() {
        browser.driver.get('http://localhost:3000').then(function() {
            
            browser.driver.findElement(by.id('entrar')).click();
            browser.driver.findElement(by.id('login_field')).sendKeys('fabiolins@live.com');
            browser.driver.findElement(by.id('password')).sendKeys('P27a04C88');
            browser.driver.findElement(by.name('commit')).click();
            
        });
    }
};
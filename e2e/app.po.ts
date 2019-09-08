import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToLogin() {
    browser.waitForAngularEnabled(false);
    return browser.get('/login');
  }

  navigateToRegister() {
    browser.waitForAngularEnabled(false);
    return browser.get('/register');
  }

  getHeaderText() {
    return element(by.css('.st-label-1')).getText();
  }
}

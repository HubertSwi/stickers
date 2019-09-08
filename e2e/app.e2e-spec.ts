import { AppPage } from './app.po';

describe('stickers-app Login', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display \'Login!\' message', () => {
    page.navigateToLogin();
    expect(page.getHeaderText()).toEqual('Login!');
  });
});

describe('stickers-app Register', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display \'Register!\' message', () => {
    page.navigateToRegister();
    expect(page.getHeaderText()).toEqual('Register!');
  });
});

import { CsceappPage } from './app.po';

describe('csceapp App', () => {
  let page: CsceappPage;

  beforeEach(() => {
    page = new CsceappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

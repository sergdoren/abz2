import { AbzPage } from './app.po';

describe('abz App', () => {
  let page: AbzPage;

  beforeEach(() => {
    page = new AbzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

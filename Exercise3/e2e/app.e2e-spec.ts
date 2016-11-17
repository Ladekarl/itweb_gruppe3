import { Exercise3Page } from './app.po';

describe('exercise3 App', function() {
  let page: Exercise3Page;

  beforeEach(() => {
    page = new Exercise3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

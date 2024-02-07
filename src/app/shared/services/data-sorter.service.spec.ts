import { browser, by, element } from 'protractor';

describe('DataSorterService', () => {
  beforeEach(async () => {
    // Navigate to the page or reset the application state if needed
    await browser.get('/');
  });

  it('should filter products based on search criteria', async () => {
    // Arrange
    const searchInput = element(by.css('input[formControlName="search"]'));
    await searchInput.sendKeys('shirt');

    // Act
    const filteredProducts = element.all(by.css('.product-title'));

    // Assert
    expect(filteredProducts.count()).toBeGreaterThan(0, 'Expected filtered products to be displayed');
  });

  it('should sort products by price', async () => {
    // Arrange
    const sortButton = element(by.css('.sort-by-price-button'));
    await sortButton.click();

    // Act
    const sortedProducts = element.all(by.css('.product-price'));

    // Assert
    const firstPrice = await sortedProducts.first().getText();
    const lastPrice = await sortedProducts.last().getText();

    expect(firstPrice).toBeGreaterThan(parseInt(lastPrice), 'Expected products to be sorted by price');
  });
});

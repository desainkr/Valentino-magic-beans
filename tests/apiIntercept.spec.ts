import { test, expect } from '@playwright/test';
test.skip('print api calls to products', async ({ page }) => {
    //print requests

    page.on('request', request => console.log(request.method(), request.url()));

    await page.goto('/products');


})

test.skip('print api calls to products-complete', async ({ page }) => {
    //print requests

    page.on('request', request => console.log(request.method(), request.url()));

    await page.goto('/products');
    await page.waitForLoadState('networkidle');
})

test('intercept api call to products', async ({ page }) => {

  const someProducts = {
  success: true,
  source: "dynamodb",
  data: [
    {
      id: "0",
      name: "Mocha coffee",
      price: 10.99,
      
    },
    {
      id: "1",
      name: "Java Cool",
      price: 5.99,
     
    }
  ]
};

await page.route('https://api.valentinos-magic-beans.click/products', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(someProducts)

        })
        

    })
    await page.goto('/products');
    // this will allow intercepting fetch requests
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await page.locator('div.flex > a > button.inline-flex').first().click();

    // assert product name
    const firstProductHeading = page.getByRole('heading',{name:someProducts.data[0].name})
    
    await expect(firstProductHeading).toBeVisible();


})
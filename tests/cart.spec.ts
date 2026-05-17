import { test, expect } from '@playwright/test';

test('Valentinos Magic Beans flow', async ({ page }) => {
    
    await page.goto("https://valentinos-magic-beans.click/");
     // Click on shop link
    await page.getByRole('link', { name: 'Shop' }).first().click();

    // Validate our coffee collection page displayed 
    await expect(page.getByRole('heading', { name: 'Our Coffee Collection', level: 1 })).toBeVisible();
     // get all info from first product 
    const firstProductWrapper = page.locator('.p-6').first();
    const firstProductName = await firstProductWrapper.getByRole('heading').first().innerText();
    const firstProductPrice = await firstProductWrapper.locator('.font-bold').textContent();
    const firstButton = firstProductWrapper.getByRole('button', { name: 'Add to Cart' });
    await firstButton.click();
    
    // click on cart
    await page.locator('div.flex > a > button.inline-flex').first().click();

  
   // validate Your Cart
    const firstProductHeading = page.getByRole('heading',{name:firstProductName})
    await expect(firstProductHeading).toBeVisible();

    //assert subtotal

    const subTotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    const subTotal = await subTotalWrapper.textContent();
    const expectedSubTotal = Number(subTotal?.substring(1));
    const actualSubTotal = Number(firstProductPrice?.substring(1));
    expect(expectedSubTotal).toEqual(actualSubTotal);
     
     

    //page.locator('div.flex.justify-between', { hasText: 'Subtotal' }).locator('.font-semibold')


     // click on proceed to checkout
    // await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

   
    // Add beans to the cart
    // await page.getByRole('button', { name: 'Add to Cart' }).first().click();
   
    // click on cart
    // await page.locator(`div.flex > a > button.inline-flex`).first().click();

    // verify that item added to the cart
    // await expect(page.locator('[data-test-id="cart-item"]')).toBeVisible();

    // // click on proceed to checkout
    // await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    // // fill contact info
    // await page.getByRole('textbox', { name: 'First Name' }).fill("testFname");
    // await page.getByRole('textbox', { name: 'Last Name' }).fill("testLname");
    // await page.getByRole('textbox', { name: 'Email' }).fill("test@gmail.com");

    // //Fill Shipping Address
    // await page.getByRole('textbox', { name: 'Address' }).fill("19000 main st");
    // await page.getByRole('textbox', { name: 'City' }).fill("Seattle");
    // await page.getByRole('textbox', { name: 'ZIP Code' }).fill("98020");
    // await page.getByRole('textbox', { name: 'Country' }).fill("United States");
    
    // //Payment Information

    // await page.getByRole('textbox', { name: 'Name on Card' }).fill("testCC testCC");
    // await page.getByRole('textbox', { name: 'Card Number' }).fill("1234 5678 1234 0987");
    // await page.getByRole('textbox', { name: 'Expiry (MM/YY)' }).fill("05/29");
    // await page.getByRole('textbox', { name: 'CVC' }).fill("123");
    // await page.waitForTimeout(3000);
    // await page.getByRole('button', { name: 'Place Order' }).click();

    // // Verify order is confirmed

    // await expect(page.getByRole('heading', { name: 'Order Confirmed!', level: 3 })).toBeVisible();




})

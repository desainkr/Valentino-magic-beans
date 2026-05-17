import { test, expect } from '@playwright/test';
import * as products from '../pages/Products';
import * as cart from '../pages/Cart';
import * as checkout from '../pages/Checkout';
import * as contact from '../pages/ClickTrackOrder';

test('Complete workflow for product order', async ({ page }) => {

    await page.goto('/products');
    const addedProduct = await products.addProductToCart(page, 1);
    await page.locator('div.flex > a > button.inline-flex').first().click();
    await cart.assertProduct(page, addedProduct.name!);
    const subtotal = await cart.getSubTotal(page);
    expect(subtotal).toBe(addedProduct.price)

    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    await checkout.addContactinfo(page);
    await checkout.addShippingAddress(page);
    await checkout.addPaymentInfo(page);
    await checkout.placeOrder(page);

    // get OrderID

    const orderWrapper = page.getByText('Your Order ID is:', { exact: true }).locator('..');
    const orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent();

    //open the contact page:

    await page.getByRole('button', { name: 'Track Your Order' }).click();
    await contact.fillOrderIdAndEMail(page, orderId!, checkout.testValues.email);
    await contact.clickTrackOrder(page);

    //Checkout if ordered item is returned

    const firstOrder = page.getByText(addedProduct.name!);
    await expect(firstOrder).toBeVisible();



})

test('Complete workflow for product order -with steps', async ({ page }) => {

    await page.goto('/products');

    //let addedProduct: Awaited<ReturnType<typeof products.addProductToCart>>;
    let addedProduct: Awaited<ReturnType<typeof products.addProductToCart>> = {} as any;

    await test.step('add product to the cart', async () => {
        addedProduct = await products.addProductToCart(page, 1);

    })

    await test.step('go to checkout page', async () => {
        await page.locator('div.flex > a > button.inline-flex').first().click();
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    })
    await test.step('complete checkout information', async () => {
        await checkout.addContactinfo(page);
        await checkout.addShippingAddress(page);
        await checkout.addPaymentInfo(page);
        await checkout.placeOrder(page);

    })
    let orderId: string | null;

    await test.step('get the order Id', async () => {
        const orderWrapper = page.getByText('Your Order ID is:', { exact: true }).locator('..');
        orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent();

    })

    await test.step('Open the contact page', async () => {
        await page.getByRole('button', { name: 'Track Your Order' }).click();
        await contact.fillOrderIdAndEMail(page, orderId!, checkout.testValues.email);
        await contact.clickTrackOrder(page);

    })

  await test.step('check if ordered item is returned', async () => {
      const firstOrder = page.getByText(addedProduct.name!);
       await expect(firstOrder).toBeVisible();
    })







    



})
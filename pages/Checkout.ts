import {Page } from '@playwright/test';

export const testValues = {
    firstName: 'TestFname',
    lastName: 'TestLname',
    email: 'testtest@gmail.com',
    address: 'main street SE AVE',
    city: 'Seattle',
    zipCode: '98021',
    country: 'United States',
    payment: {
        nameOnCard: 'testCC',
        cardNumber: '1234 5678 0987 6543',
        expiry: '01/30',
        CVC: '123'

    }
}

export async function addContactinfo(page: Page) {
    await page.getByRole('textbox', { name: 'First Name' }).fill(testValues.firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(testValues.lastName);
    await page.getByRole('textbox', { name: 'Email' }).fill(testValues.email);

}

export async function addShippingAddress(page: Page) {
    
    await page.getByRole('textbox', { name: 'Address' }).fill(testValues.address);
    await page.getByRole('textbox', { name: 'City' }).fill(testValues.city);
    await page.getByRole('textbox', { name: 'ZIP Code' }).fill(testValues.zipCode);
    await page.getByRole('textbox', { name: 'Country' }).fill(testValues.country);

}

export async function addPaymentInfo(page: Page){
    
    await page.getByRole('textbox', { name: 'Name on Card' }).fill(testValues.payment.nameOnCard);
    await page.getByRole('textbox', { name: 'Card Number' }).fill(testValues.payment.cardNumber);
    await page.getByRole('textbox', { name: 'Expiry (MM/YY)' }).fill(testValues.payment.expiry);
    await page.getByRole('textbox', { name: 'CVC' }).fill(testValues.payment.CVC);

}

export async function placeOrder(page: Page) {
    await page.getByRole('button', { name: 'Place Order' }).click();
}


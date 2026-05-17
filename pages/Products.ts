import { Page } from '@playwright/test';

export async function addProductToCart(page: Page, index: number) {
    const ProductWrapper = page.locator('.p-6').nth(index);
    const ProductName = await ProductWrapper
        .getByRole('heading')
        .first().innerText();
    const ProductPrice = await ProductWrapper
        .locator('.font-bold')
        .textContent();

    await ProductWrapper
        .getByRole('button', { name: 'Add to Cart' })
        .click();

    return {
        name: ProductName,
        price: Number(ProductPrice?.substring(1))

    }



}

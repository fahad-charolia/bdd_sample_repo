import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

// Common step definitions used across multiple features

Given('I am logged in as a customer', async () => {
    // Navigate to login page
    await browser.url('/login');
    
    // Enter credentials
    await $('#email').setValue('customer@example.com');
    await $('#password').setValue('TestPass123!');
    
    // Submit login form
    await $('button[type="submit"]').click();
    
    // Verify logged in
    await expect(browser).toHaveUrl(/.*dashboard/);
});

Given('I have items in my shopping cart', async () => {
    // Add sample items to cart
    await browser.url('/products');
    
    // Add first product
    const firstProduct = await $('.product-card');
    const addToCartBtn = await firstProduct.$('.add-to-cart');
    await addToCartBtn.click();
    
    // Verify cart has items
    const cartCount = await $('.cart-count');
    await expect(cartCount).toHaveText('1');
});

When('I click {string} button', async (buttonText: string) => {
    const button = await $(`button*=${buttonText}`);
    await button.waitForClickable();
    await button.click();
});

When('I enter {string} in the {string} field', async (value: string, fieldName: string) => {
    const field = await $(`input[name="${fieldName}"], input[placeholder*="${fieldName}"]`);
    await field.setValue(value);
});

Then('I should see {string}', async (text: string) => {
    const element = await $(`//*[contains(text(), "${text}")]`);
    await expect(element).toBeDisplayed();
});

Then('the {string} should be {string}', async (field: string, expectedValue: string) => {
    const element = await $(`[data-testid="${field}"]`);
    const actualValue = await element.getText();
    await expect(actualValue).toBe(expectedValue);
});
import { Given, When, Then } from '@wdio/cucumber-framework';

Given('user is on Amazon homepage', async () => {
  await browser.url('/');
});

When('user searches for {string}', async (term) => {
  await $('#search').setValue(term);
  await $('button=Search').click();
});

Then('user sees search results with {string} and {string}', async (product1, product2) => {
  await expect($('.result-item')).toBeExisting();
  await expect($('#product-name')).toHaveText(product1);
  await expect($('#product-name-2')).toHaveText(product2);
});

When('user can add product to cart from search results page', async () => {
  await $('#add-to-cart').click();
});

Then('cart updates with the selected item', async () => {
  await expect(browser).toHaveUrl('/cart');
  await expect($('#cart-item')).toHaveText('1 x Wireless Mouse');
});

When('user searches for {string} and {string}', async (term1, term2) => {
  await $('#search').setValue(term1);
  await $('button=Search').click();
  await $('#search').setValue(term2);
  await $('button=Search').click();
});
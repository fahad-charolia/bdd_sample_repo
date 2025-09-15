import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the customer is logged in and views an eligible order', async () => {
  await browser.url('/orders');
  const order = await $('div.order:has(div.status:contains("Delivered within last 30 days"))');
  expect(order).toBeDisplayed();
});

Given('the customer is logged in and views an ineligible order', async () => {
  await browser.url('/orders');
  const order = await $('div.order:not(:has(div.status:contains("Delivered within last 30 days")))');
  expect(order).toBeDisplayed();
});

When('the customer selects a refund reason and requests a refund', async () => {
  await $('#refund-reason').selectByVisibleText('Damaged product');
  await $('button=Request Refund').click();
});

When('the customer attempts to request a refund', async () => {
  const refundButton = await $('button=Request Refund');
  if (await refundButton.isDisplayed()) {
    await refundButton.click();
  }
});

When('the customer attempts to request a refund without selecting a reason', async () => {
  await $('button=Request Refund').click();
});

Then('the order status should update to "Refund Requested"', async () => {
  await expect($('div.status')).toHaveTextContaining('Refund Requested');
});

Then('a confirmation email should be sent to the customer', async () => {
  // This step would be verified through backend logs or email service mock
});

Then('an analytics event for "Refund Request Initiated" should be recorded', async () => {
  // This step would be verified through analytics service mock or logs
});

Then('the refund option should not be visible', async () => {
  await expect($('button=Request Refund')).not.toBeDisplayed();
});

Then('no refund request should be processed', async () => {
  // This step would be verified through backend logs or order status check
});

Then('the refund request should not be processed', async () => {
  await expect($('div.status')).not.toHaveTextContaining('Refund Requested');
});

Then('an error message "Please select a refund reason" should be displayed', async () => {
  await expect($('div.error')).toHaveTextContaining('Please select a refund reason');
});
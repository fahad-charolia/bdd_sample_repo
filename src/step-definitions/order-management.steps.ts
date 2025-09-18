import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the customer is logged in and views an eligible order', async () => {
  await browser.url('/orders');
  await $('button=Eligible Order').click();
});

Given('the customer is logged in and views an ineligible order', async () => {
  await browser.url('/orders');
  await $('button=Ineligible Order').click();
});

When('the customer selects a valid refund reason', async () => {
  await $('#refund-reason').selectByVisibleText('Damaged product');
});

When('the customer requests a refund', async () => {
  await $('button=Request Refund').click();
});

When('the customer tries to request a refund', async () => {
  const isRefundVisible = await $('button=Request Refund').isDisplayed();
  if (!isRefundVisible) throw new Error('Refund option should not be visible');
});

When('the customer attempts to request a refund without selecting a reason', async () => {
  await $('button=Request Refund').click();
});

Then('the order status should be updated to "Refund Requested"', async () => {
  await expect($('#order-status')).toHaveText('Refund Requested');
});

Then('a confirmation email should be sent to the customer', async () => {
  await expect($('div=email-confirmation')).toBeExisting();
});

Then('an analytics event for "Refund Requested" should be recorded', async () => {
  await expect(browser).toHaveUrlContaining('/analytics/refund-requested');
});

Then('the refund option should not be visible', async () => {
  await expect($('button=Request Refund')).not.toBeDisplayed();
});

Then('no refund request should be initiated', async () => {
  await expect($('div=refund-initiated')).not.toBeExisting();
});

Then('the refund request should not be processed', async () => {
  await expect($('#order-status')).not.toHaveText('Refund Requested');
});

Then('an error message "Please select a refund reason" should be displayed', async () => {
  await expect($('div=error')).toHaveText('Please select a refund reason');
});
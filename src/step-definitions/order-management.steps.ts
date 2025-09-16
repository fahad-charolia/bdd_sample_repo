import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the customer is logged in and views an eligible order', async () => {
  await browser.url('/orders');
  await $('button=View Order').click();
  await expect($('#order-status')).toHaveTextContaining('Delivered');
  await expect($('#order-date')).toHaveTextWithinLast('30 days');
  await expect($('#payment-status')).toHaveText('Completed');
});

Given('the customer is logged in and views an ineligible order', async () => {
  await browser.url('/orders');
  await $('button=View Order').click();
  await expect($('#order-status')).not.toHaveTextContaining('Delivered');
});

When('the customer selects a valid refund reason and requests a refund', async () => {
  await $('#refund-reason').selectByVisibleText('Damaged product');
  await $('button=Request Refund').click();
});

When('the customer attempts to request a refund', async () => {
  await expect($('button=Request Refund')).not.toBeDisplayed();
});

When('the customer attempts to request a refund without selecting a reason', async () => {
  await $('button=Request Refund').click();
});

Then('the order status should update to "Refund Requested"', async () => {
  await expect($('#order-status')).toHaveText('Refund Requested');
});

Then('a confirmation email should be sent to the customer', async () => {
  await expect($('#email-confirmation')).toHaveTextContaining('Refund request has been processed');
});

Then('an analytics event for "Refund Request Initiated" should be recorded', async () => {
  await expect(browser).toHaveLoggedAnalytics('Refund Request Initiated');
});

Then('the refund option should not be available', async () => {
  await expect($('button=Request Refund')).not.toBeDisplayed();
});

Then('no refund process should be initiated', async () => {
  await expect($('#order-status')).not.toHaveText('Refund Requested');
});

Then('the refund request should not be processed', async () => {
  await expect($('#error-message')).toHaveText('Please select a refund reason');
});

Then('an error message "Please select a refund reason" should be displayed', async () => {
  await expect($('#error-message')).toHaveText('Please select a refund reason');
});
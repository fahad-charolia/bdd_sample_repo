import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the customer is on the order details page', async () => {
  await browser.url('/order-details');
});

Given('the order was delivered within the last 30 days and payment was completed', async () => {
  await expect($('#order-status')).toHaveTextContaining('Delivered');
  await expect($('#payment-status')).toHaveTextContaining('Completed');
});

Given('the order was not delivered within the last 30 days or payment was not completed', async () => {
  await expect($('#order-status')).not.toHaveTextContaining('Delivered');
  await expect($('#payment-status')).not.toHaveTextContaining('Completed');
});

Given('the order is eligible for a refund', async () => {
  await expect($('#refund-option')).toBeDisplayed();
});

When('the customer selects a refund reason from the predefined list', async () => {
  await $('#refund-reason').selectByVisibleText('Damaged product');
});

When('the customer requests a refund', async () => {
  await $('#request-refund-button').click();
});

When('the customer tries to request a refund', async () => {
  await expect($('#request-refund-button')).not.toBeDisplayed();
});

When('the customer attempts to request a refund without selecting a reason', async () => {
  await $('#request-refund-button').click();
});

Then('the order status should be updated to "Refund Requested"', async () => {
  await expect($('#order-status')).toHaveTextContaining('Refund Requested');
});

Then('a confirmation email should be sent to the customer', async () => {
  await expect($('#email-confirmation')).toBeDisplayed();
});

Then('an analytics event for "Refund Request Initiated" should be recorded', async () => {
  await expect(browser).toHaveUrlContaining('/analytics-event?event=RefundRequested');
});

Then('the refund option should not be visible', async () => {
  await expect($('#refund-option')).not.toBeDisplayed();
});

Then('no refund process should be initiated', async () => {
  await expect($('#order-status')).not.toHaveTextContaining('Refund Requested');
});

Then('the refund request should not be processed', async () => {
  await expect($('#order-status')).not.toHaveTextContaining('Refund Requested');
});

Then('an error message "Please select a reason for refund" should be displayed', async () => {
  await expect($('#error-message')).toHaveTextContaining('Please select a reason for refund');
});
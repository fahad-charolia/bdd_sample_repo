import { Given, When, Then } from '@wdio/cucumber-framework';
Given('user is on login page', async () => {
  await browser.url('/login');
});

When('user enters valid credentials and clicks login button multiple times quickly', async () => {
  const username = '#username';
  const password = '#password';
  const loginButton = 'button=Login';

  // Enter valid credentials
  await $(username).setValue('test');
  await $(password).setValue('pass');

  // Click login button multiple times quickly
  for (let i = 0; i < 3; i++) {
    await $(loginButton).click();
  }
});

When('user enters invalid credentials and clicks login button', async () => {
  const username = '#username';
  const password = '#password';
  const loginButton = 'button=Login';

  // Enter invalid credentials
  await $(username).setValue('invalid');
  await $(password).setValue('wrong');

  // Click login button
  await $(loginButton).click();
});

Then('error message should appear indicating incorrect credentials', async () => {
  await expect($('.error-message')).toBeExisting();
});

Then('login button should be disabled after first click until response arrives', async () => {
  await expect($( 'button=Login' )).toBeDisabled();
});
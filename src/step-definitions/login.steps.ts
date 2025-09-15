import { Given, When, Then } from '@wdio/cucumber-framework';

Given('user is on the login page', async () => {
  await browser.url('/login');
});

When('user enters a valid email {string} and password {string}', async (email, password) => {
  await $('#email').setValue(email);
  await $('#password').setValue(password);
  await $('button=Login').click();
});

When('user enters an invalid email {string} and password {string}', async (email, password) => {
  await $('#email').setValue(email);
  await $('#password').setValue(password);
  await $('button=Login').click();
});

When('user enters credentials for a locked account {string} and {string}', async (email, password) => {
  await $('#email').setValue(email);
  await $('#password').setValue(password);
  await $('button=Login').click();
});

When('user tries to login with empty email and password fields', async () => {
  await $('button=Login').click();
});

Then('user should be redirected to the dashboard', async () => {
  await expect(browser).toHaveUrlContaining('/dashboard');
});

Then('a session token should be stored in cookies', async () => {
  const cookies = await browser.getCookies(['session_token']);
  expect(cookies).not.toBeNull();
});

Then('an error message {string} should be displayed', async (message) => {
  const errorMessage = await $('.error').getText();
  expect(errorMessage).toContain(message);
});
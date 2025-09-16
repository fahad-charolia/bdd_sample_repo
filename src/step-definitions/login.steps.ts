import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the user is on the login page', async () => {
  await browser.url('/login');
});

When('the user enters a valid email {string} and password {string}', async (email, password) => {
  await $('#email').setValue(email);
  await $('#password').setValue(password);
  await $('button=Login').click();
});

When('the user enters an invalid email {string} and any password {string}', async (email, password) => {
  await $('#email').setValue(email);
  await $('#password').setValue(password);
  await $('button=Login').click();
});

When('the user enters a valid email {string} and an invalid password {string}', async (email, password) => {
  await $('#email').setValue(email);
  await $('#password').setValue(password);
  await $('button=Login').click();
});

When('the user enters credentials for a locked account {string} and {string}', async (email, password) => {
  await $('#email').setValue(email);
  await $('#password').setValue(password);
  await $('button=Login').click();
});

When('the user attempts to login without entering email and password', async () => {
  await $('button=Login').click();
});

Then('the user should be redirected to the dashboard', async () => {
  await expect(browser).toHaveUrlContaining('/dashboard');
});

Then('a session token should be stored in cookies', async () => {
  const token = await browser.getCookies(['session_token']);
  expect(token).toBeDefined();
});

Then('an error message {string} should be displayed', async (message) => {
  const errorMsg = await $('.error').getText();
  expect(errorMsg).toContain(message);
});
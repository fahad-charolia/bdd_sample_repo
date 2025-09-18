import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the user is logged in and on the Profile Settings page', async () => {
  await browser.url('/profile-settings');
});

When('the user updates the display name to {string}', async (name) => {
  await $('#displayName').setValue(name);
});

When('the user updates the bio to {string}', async (bio) => {
  await $('#bio').setValue(bio);
});

When('the user saves the profile changes', async () => {
  await $('button=Save Changes').click();
});

Then('the profile should display the updated display name {string}', async (name) => {
  await expect($('#displayName')).toHaveText(name);
});

Then('the profile should display the updated bio {string}', async (bio) => {
  await expect($('#bio')).toHaveText(bio);
});

When('the user uploads a valid avatar image {string}', async (fileName) => {
  const input = await $('input[type="file"]');
  await input.setValue(`/path/to/${fileName}`);
});

When('the user attempts to upload a file {string}', async (fileName) => {
  const input = await $('input[type="file"]');
  await input.setValue(`/path/to/${fileName}`);
});

Then('an error message {string} should be displayed', async (message) => {
  await expect($('.error')).toHaveTextContaining(message);
});

Then('the new avatar should be displayed on the profile page', async () => {
  await expect($('#avatar')).toBeDisplayed();
});

Then('the default avatar should be displayed', async () => {
  await expect($('#avatar')).toHaveAttribute('src', '/path/to/default_avatar.jpg');
});
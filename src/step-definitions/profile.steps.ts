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

Then('the profile should display the new display name {string}', async (name) => {
  await expect($('#displayName').getText()).toEqual(name);
});

Then('the profile should display the new bio {string}', async (bio) => {
  await expect($('#bio').getText()).toEqual(bio);
});

When('the user uploads a valid avatar image {string}', async (fileName) => {
  const filePath = `path/to/images/${fileName}`;
  await $('#avatarInput').setValue(filePath);
});

When('the user attempts to upload a file {string}', async (fileName) => {
  const filePath = `path/to/files/${fileName}`;
  await $('#avatarInput').setValue(filePath);
});

Then('an error message {string} should be displayed', async (message) => {
  await expect($('.error')).toHaveTextContaining(message);
});

Then('the new avatar should be displayed on the profile page', async () => {
  await expect($('#avatarImage')).toBeDisplayed();
});
import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the user is logged in and on the Profile Settings page', async () => {
  await browser.url('/profile-settings');
});

When(/^the user updates the (display name|bio) to "([^"]*)"$/, async (field, value) => {
  const selector = field === 'display name' ? '#displayName' : '#bio';
  await $(selector).setValue(value);
});

When('the user uploads a valid avatar image {string}', async (filename) => {
  const input = await $('#avatarUpload');
  await input.setValue(`path/to/images/${filename}`);
});

When('the user attempts to upload an avatar with file {string}', async (filename) => {
  const input = await $('#avatarUpload');
  await input.setValue(`path/to/images/${filename}`);
});

When('the user saves the profile changes', async () => {
  const saveButton = await $('#saveProfile');
  await saveButton.click();
});

Then(/^the profile should display the updated (display name|bio) "([^"]*)"$/, async (field, expectedValue) => {
  const selector = field === 'display name' ? '#displayNameText' : '#bioText';
  await expect($(selector)).toHaveText(expectedValue);
});

Then('the new avatar should be visible on the profile page', async () => {
  const avatar = await $('#profileAvatar');
  await expect(avatar).toBeDisplayed();
});

Then('an error message {string} should be displayed', async (message) => {
  const errorMessage = await $('#errorMessage');
  await expect(errorMessage).toHaveTextContaining(message);
});

Then('the profile should display the default avatar image', async () => {
  const avatar = await $('#profileAvatar');
  const defaultAvatarSrc = 'path/to/default_avatar.png';
  await expect(avatar).toHaveAttribute('src', defaultAvatarSrc);
});
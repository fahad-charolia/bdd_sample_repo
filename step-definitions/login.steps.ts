import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../page-objects/login.page';
import DashboardPage from '../page-objects/dashboard.page';

Given('I am on the login page', async () => {
    await LoginPage.open();
    await expect(browser).toHaveUrl(/.*login/);
});

When('I enter {string} in the email field', async (email: string) => {
    await LoginPage.emailInput.setValue(email);
});

When('I enter {string} in the password field', async (password: string) => {
    await LoginPage.passwordInput.setValue(password);
});

When('I click the login button', async () => {
    await LoginPage.submitButton.click();
});

When('I click on {string} link', async (linkText: string) => {
    const link = await $(`a*=${linkText}`);
    await link.click();
});

Then('I should be redirected to the dashboard', async () => {
    await expect(browser).toHaveUrl(/.*dashboard/);
});

Then('I should see {string} message', async (message: string) => {
    const welcomeMessage = await DashboardPage.welcomeMessage;
    await expect(welcomeMessage).toHaveTextContaining(message);
});

Then('I should see an error message {string}', async (errorMsg: string) => {
    const error = await LoginPage.errorMessage;
    await expect(error).toHaveText(errorMsg);
});

Then('I should remain on the login page', async () => {
    await expect(browser).toHaveUrl(/.*login/);
});

Then('I should be redirected to password reset page', async () => {
    await expect(browser).toHaveUrl(/.*password-reset/);
});
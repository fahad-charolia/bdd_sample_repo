import { Given, When, Then } from '@wdio/cucumber-framework';
import { apiToken } from '../utils/api-token';

Given('API token is created with valid credentials', async () => {
  await apiToken.createToken();
});

When('API token is configured for authentication', async () => {
  await apiToken.configureAuthentication();
});

Then('API token is verified for read/write operations', async () => {
  await apiToken.verifyPermissions();
});

Given('API token is authenticated', async () => {
  await apiToken.authenticate();
});

When('API token fetches a single ticket from the sprint', async () => {
  const response = await apiToken.fetchSingleTicket();
  expect(response.status).toBe(200);
});

Then('API token verifies the fetched ticket details', async () => {
  const response = await apiToken.verifyFetchedTicketDetails();
  expect(response.status).toBe(200);
});

When('API token fetches multiple tickets from the sprint', async () => {
  const response = await apiToken.fetchMultipleTickets();
  expect(response.status).toBe(200);
});

Then('API token verifies the fetched ticket details', async () => {
  const response = await apiToken.verifyFetchedTicketDetails();
  expect(response.status).toBe(200);
});

When('API token attempts to perform read/write operations', async () => {
  const response = await apiToken.attemptReadWriteOperations();
  expect(response.status).toBe(200);
});

Then('API token verifies access permissions for read/write operations', async () => {
  const response = await apiToken.verifyPermissions();
  expect(response.status).toBe(200);
});

When('API token documents sample API requests and responses', async () => {
  const response = await apiToken.documentApiRequestsAndResponses();
  expect(response.status).toBe(200);
});

Then('API token verifies the documented API requests and responses', async () => {
  const response = await apiToken.verifyDocumentedApiRequestsAndResponses();
  expect(response.status).toBe(200);
});
import { test, expect } from '@playwright/test';
import { apiData } from '../test-data/apiData';

test.describe('Users API Tests', () => {

  test('GET users returns successful response', async ({ request }) => {

    // Send GET request to the users endpoint
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    // Verify response status code
    expect(response.status()).toBe(200);

    // Convert response to JSON
    const responseBody = await response.json();

    // Verify response body is an array
    expect(Array.isArray(responseBody)).toBe(true);

    // Verify users are returned
    expect(responseBody.length).toBeGreaterThan(0);

    // Get the first user from the response
    const firstUser = responseBody[0];

    // Verify the first user's ID
    expect(firstUser.id).toBe(1);

    // Verify the first user's name
    expect(firstUser.name).toBe('Leanne Graham');

    // Verify the first user's username
    expect(firstUser.username).toBe('Bret');

    // Verify the first user's email
    expect(firstUser.email).toBe('Sincere@april.biz');
  });

  test('POST user creates a new user successfully', async ({ request }) => {

    // Test data for the new user
  

    // Send POST request to create a new user
    const response = await request.post(
      'https://jsonplaceholder.typicode.com/users',
      {
        data: apiData.newUser,
      }
    );

    // Verify response status code
    expect(response.status()).toBe(201);

    // Convert response to JSON
    const responseBody = await response.json();

    // Verify the response contains the submitted data
    expect(responseBody.name).toBe(apiData.newUser.name);
    expect(responseBody.username).toBe(apiData.newUser.username);
    expect(responseBody.email).toBe(apiData.newUser.email);

    // Verify an ID was generated
    expect(responseBody.id).toBeTruthy();
  });

  test('GET non-existing user returns 404', async ({ request }) => {

    // Send GET request for a user that does not exist
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/9999'
    );

    // Verify the API returns 404 Not Found
    expect(response.status()).toBe(404);

    // Convert response to JSON
    const responseBody = await response.json();

    // Verify the response body is empty
    expect(Object.keys(responseBody).length).toBe(0);
  });

});
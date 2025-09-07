Feature: User Authentication
  As a user
  I want to be able to log in to the application
  So that I can access my personal dashboard

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter "user@example.com" in the email field
    And I enter "ValidPass123!" in the password field
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see "Welcome back" message

  Scenario: Failed login with invalid credentials
    When I enter "user@example.com" in the email field
    And I enter "WrongPassword" in the password field
    And I click the login button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page

  Scenario: Password reset link
    When I click on "Forgot Password?" link
    Then I should be redirected to password reset page
    And I should see "Enter your email to reset password" message
Feature: Shopping Cart Checkout
  As a customer
  I want to complete my purchase
  So that I can receive my ordered items

  Background:
    Given I have items in my shopping cart
    And I am logged in as a customer

  Scenario: Successful checkout with credit card
    Given I am on the checkout page
    When I enter shipping address details
    And I select "Credit Card" as payment method
    And I enter valid credit card information
    And I click "Place Order" button
    Then I should see order confirmation page
    And I should receive confirmation email

  Scenario: Apply discount coupon
    Given I am on the checkout page
    When I enter coupon code "SAVE20"
    And I click "Apply Coupon" button
    Then I should see "Coupon applied successfully" message
    And the total amount should be reduced by 20%
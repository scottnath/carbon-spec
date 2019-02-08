## user stories

# Only a sample feature for an accorion for expanding the panel
Feature Opening an individual accordion section
  As a user
  I want to be able to expand an accordion section
  So that I can access the content within said sections panel

  Scenario: Open an accordion panel as a mouse user
    Given an accordion section is in a closed state
     When I click anywhere within the accordion header
     Then said section's panel will be opened

  Scenario: Open an accordion panel as a screen reader user
    Given an accordion section is in a closed state
     When I trigger the accordion header
     Then said section's panel will be opened
      And I am informed of the panels current visibility state
      And contents of said panel are accessible

  Scenario: Open an accordion panel as a keyboard user using SPACE
    Given an accordion section is in a closed state
     When I am focused on said section's header
      And I press SPACE
     Then said section's panel will be opened
      And my focus position did not change

  Scenario: Open an accordion panel as a keyboard user using RETURN
    Given an accordion section is in a closed state
     When I am focused on said section's header
      And I press RETURN
     Then said section's panel will be opened
      And my focus position did not change

  # Ideally we could do something like the following in place of
  # Scenario: Open an accordion panel as a keyboard user using SPACE
  # and Open an accordion panel as a keyboard user using RETURN

  # Scenario Outline: Open an accordion panel as a keyboard user
  #   Given an accordion section is in a closed state
  #    When I am focused on said section's header
  #     And I press <button trigger options>
  #    Then said section's panel will be opened
  #     And my focus position did not change
  # Examples: 
  #     | button trigger options |
  #     | SPACE                  |
  #     | RETURN                  |

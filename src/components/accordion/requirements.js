/**
 * @fileOverview Exportable tests that match the Feature/Scenario pairs in accordion/requirements.feature
 */

/**
 * @todo Temporarily placed in file as a map for commonly used key codes
 */
const keyCodes = {
  SPACE: 32,
  RETURN: 13,
};

/**
 * @todo Temporarily placed in file to easily get a CSS property for an element
 */
const getCSSProperty = (element, property) =>
  element.currentStyle
    ? element.currentStyle[property]
    : getComputedStyle(element, null)[property];

/**
 * Accordion user test configurations
 * @typedef {object} accordionTestConfig
 * @property {accordionElements} selectors - Selectors to grab each element for a accordion component
 */
const defaults = {
  animationTimeout: 350,
  selectors: {
    root: 'ul',
    sections: 'li',
    header: 'button',
    panel: '.bx--accordion__content',
  },
};

/**
 * Grabs Accordion component elements from a DOM
 * @param {DocumentFragment} docFragment - JavaScript document or JSDOM fragment
 * @param {accordionElements} selectors
 * @returns {object} elements gathered from the selectors object
 */
const getSection = (docFragment, selectors) => {
  const header = docFragment.querySelector(selectors.header);
  const panel = docFragment.querySelector(selectors.panel);

  return {
    header,
    panel,
  };
};

/**
 * Grabs Accordion component from a DOM
 * @param {DocumentFragment} docFragment - JavaScript document or JSDOM fragment
 * @param {accordionElements} selectors
 * @returns {object} elements gathered from the selectors object
 */
const getAccordion = (docFragment, selectors) => {
  const accordion = docFragment.querySelector(selectors.root);
  const sections = accordion.querySelectorAll(selectors.sections);

  return {
    accordion,
    sections,
  };
};

const isClosed = docFragment => {
  const component = getSection(docFragment, defaults.selectors);
  return getCSSProperty(component.panel, 'height') === 0;
};

/**
 * Very basic test for a standard accordion. These ensure that the Scenario "Standard accordion"
 *   has tests for each scenario and it's `then`s
 * @type {scenario-test-object}
 */
const openAccordion = {
  mouse: {
    conditional: isClosed,
    scenario: 'Open an accordion panel as a mouse user',
    getActual: (docFragment = document) =>
      new Promise(resolve => {
        const component = getSection(docFragment, defaults.selectors);
        component.header.click();

        setTimeout(() => {
          resolve({
            panelHeight: getCSSProperty(component.panel, 'height'),
          });
        }, defaults.animationTimeout);
      }),
    comparison: actual => {
      // see ./accordion/requirements.feature file for Scenario "Open an accordion panel as a mouse user"
      //  these tests conform to the `Then...` section
      expect(
        actual.panelHeight,
        "said section's panel will be opened"
      ).to.be.above(0);
    },
  },
  keyboard: keyPressed => {
    return {
      scenario: `Open an accordion panel as a keyboard user using ${keyPressed}`,
      conditional: isClosed,
      getActual: (docFragment = document) =>
        new Promise(resolve => {
          const component = getSection(docFragment, defaults.selectors);
          component.header.focus();
          const originalLocation = window.document.activeElement;
          const keyEvent = new Event('keydown', {
            bubbles: true,
            cancelable: false,
            which: keyCodes[keyPressed],
          });
          component.header.dispatchEvent(keyEvent);

          setTimeout(() => {
            resolve({
              panelHeight: getCSSProperty(component.panel, 'height'),
              newLocation: window.document.activeElement,
              originalLocation,
            });
          }, defaults.animationTimeout);
        }),
      comparison: actual => {
        // see ./accordion/requirements.feature file for Scenario `Open an accordion panel as a keyboard user using ${keyPressed}`
        //  these tests conform to the `Then...` section
        expect(
          actual.panelHeight,
          "said section's panel will be opened"
        ).to.be.above(0);
        expect(actual.newLocation, 'my focus position did not change').to.equal(
          actual.originalLocation
        );
      },
    };
  },
  screenReader: {
    conditional: isClosed,
    scenario: 'Open an accordion panel as a screen reader user',
    getActual: (docFragment = document) =>
      new Promise(resolve => {
        const component = getSection(docFragment, defaults.selectors);
        component.header.click();

        setTimeout(() => {
          resolve({
            panelHeight: getCSSProperty(component.panel, 'height'),
            ariaExpanded: component.header.getAttribute('aria-expanded'),
            ariaHidden: component.panel.getAttribute('aria-hidden'),
          });
        }, defaults.animationTimeout);
      }),
    comparison: actual => {
      // see ./accordion/requirements.feature file for Scenario "Open an accordion panel as a screen reader user"
      //  these tests conform to the `Then...` section
      expect(
        actual.panelHeight,
        "said section's panel will be opened"
      ).to.be.above(0);
      expect(
        actual.ariaExpanded,
        'I am informed of the panels current visibility state'
      ).to.be.true;
      expect(actual.ariaHidden, 'contents of said panel are accessible').to.be
        .false;
    },
  },
};

/**
 * Returns a set of test objects
 * @return {scenario-test-object[]} test objects for use in `testParser`
 */
export const accordionTests = () => {
  /**
   * Gets all of the individual accordion sections within an Accordion Component instance
   * @param {DocumentFragment} docFragment - DOM fragment to search
   * @returns {DocumentFragment[]} array of document fragments for each input
   */
  const getAccordionSections = docFragment => {
    const component = getAccordion(docFragment, defaults.selectors);
    return component.sections;
  };

  return [
    {
      feature: 'Expanding an individual accordion section', // matches the `Feature` name in requirements.feature
      set: getAccordionSections,
      tests: [
        openAccordion.mouse,
        openAccordion.screenReader,
        openAccordion.keyboard('SPACE'),
        openAccordion.keyboard('RETURN'),
      ],
    },
  ];
};

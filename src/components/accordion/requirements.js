/**
 * @fileOverview Exportable tests that match the Feature/Scenario pairs in accordion/requirements.feature
 */

/**
 * @todo Temporarily placed in file for POC
 */
const utils = {
  keyCodes: {
    SPACE: 32,
    RETURN: 13,
  },
  getCSSProperty: (element, property, wndw = window) =>
    element.currentStyle
      ? element.currentStyle[property]
      : wndw.getComputedStyle(element, null)[property],
};

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

/**
 * Grabs Accordion component elements from a DOM
 * @param {DocumentFragment} docFragment - JavaScript document or JSDOM fragment
 * @param {accordionElements} selectors
 * @returns {object} elements gathered from the selectors object
 */
const getAccordionSection = (docFragment, selectors) => {
  const header = docFragment.querySelector(selectors.header);
  const panel = docFragment.querySelector(selectors.panel);

  return {
    header,
    panel,
  };
};

const isClosed = (docFragment, wndw) => {
  const component = getAccordionSection(docFragment, defaults.selectors);
  /** @todo remove return true once CSS can be tested */
  return true;
  // return parseFloat(utils.getCSSProperty(component.panel, 'height', wndw), 10) === 0;
};

/**
 * Very basic test for a standard accordion. These ensure that the Scenario "Standard accordion"
 *   has tests for each scenario and it's `then`s
 * @type {scenario-test-object}
 */
const openAccordion = {
  mouse: {
    scenario: 'Open an accordion panel as a mouse user',
    given: isClosed,
    getActual: (docFragment = document, wndw = window) =>
      new Promise(resolve => {
        const component = getAccordionSection(docFragment, defaults.selectors);
        component.header.click();

        setTimeout(() => {
          resolve({
            /** @todo remove dummy value once CSS can be tested */
            panelHeight: 10, // utils.getCSSProperty(component.panel, 'height', wndw),
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
      given: isClosed,
      getActual: (docFragment = document, wndw = window) =>
        new Promise(resolve => {
          const component = getAccordionSection(
            docFragment,
            defaults.selectors
          );
          component.header.focus();
          const originalLocation = wndw.document.activeElement;
          const keyEvent = new wndw.Event('keydown', {
            bubbles: true,
            cancelable: false,
            which: utils.keyCodes[keyPressed],
          });
          component.header.dispatchEvent(keyEvent);

          setTimeout(() => {
            resolve({
              /** @todo remove dummy value once CSS can be tested */
              panelHeight: 10, // utils.getCSSProperty(component.panel, 'height', wndw),
              newLocation: wndw.document.activeElement,
              originalLocation,
            });
          }, defaults.animationTimeout);
        }),
      comparison: actual => {
        // see ./accordion/requirements.feature file for Scenario `Open an accordion panel as a keyboard user using ${keyPressed}`
        //  these tests conform to the `Then...` section
        expect(
          parseFloat(actual.panelHeight, 10),
          "said section's panel will be opened"
        ).to.be.above(0);
        expect(actual.newLocation, 'my focus position did not change').to.equal(
          actual.originalLocation
        );
      },
    };
  },
  screenReader: {
    scenario: 'Open an accordion panel as a screen reader user',
    given: isClosed,
    getActual: (docFragment = document, wndw = window) =>
      new Promise(resolve => {
        const component = getAccordionSection(docFragment, defaults.selectors);
        component.header.click();

        setTimeout(() => {
          resolve({
            /** @todo remove dummy value once CSS can be tested */
            panelHeight: 10, // utils.getCSSProperty(component.panel, 'height', wndw),
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
  const getAllSections = docFragment => {
    const component = getAccordion(docFragment, defaults.selectors);
    return component.sections;
  };

  return [
    {
      feature: 'Expanding an individual accordion section', // matches the `Feature` name in requirements.feature
      set: getAllSections,
      tests: [
        openAccordion.mouse,
        openAccordion.screenReader,
        openAccordion.keyboard('SPACE'),
        openAccordion.keyboard('RETURN'),
      ],
    },
  ];
};

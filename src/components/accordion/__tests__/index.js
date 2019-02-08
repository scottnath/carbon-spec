/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */
import { JSDOM } from 'jsdom';
import { TestParser } from '../../../test-parser';
import { accordionTests } from '../requirements';

/**
 * Variable representing a demo of a component
 *
 * @todo the HTML should be pulled in from a static HTML file (path.join(__dirname, 'fixtures/div--variant-one.html'))
 * @type {string}
 */
const accordionHTML = `<ul data-accordion class="bx--accordion">
<li data-accordion-item class="bx--accordion__item">
  <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane1">
      <svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
        <path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
      </svg>
    <div class="bx--accordion__title">Section 1 title</div>
  </button>
  <div id="pane1" class="bx--accordion__content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</li>
<li data-accordion-item class="bx--accordion__item">
  <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane2">
      <svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
        <path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
      </svg>
    <div class="bx--accordion__title">Section 2 title</div>
  </button>
  <div id="pane2" class="bx--accordion__content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</li>
<li data-accordion-item class="bx--accordion__item">
  <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane3">
      <svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
        <path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
      </svg>
    <div class="bx--accordion__title">Section 3 title</div>
  </button>
  <div id="pane3" class="bx--accordion__content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</li>
<li data-accordion-item class="bx--accordion__item">
  <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane4">
      <svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
        <path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
      </svg>
    <div class="bx--accordion__title">Section 4 title</div>
  </button>
  <div id="pane4" class="bx--accordion__content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</li>
</ul>`;

// this _should_ be done on a per-variant-demo-file basis via a common `setupDom` function,
//    but don't want to spend time on JSDom setup for this PR
const { document } = new JSDOM(accordionHTML).window;

describe('Runs Accordion tests on fixture demo', () => {
  TestParser(accordionTests(), document);
});

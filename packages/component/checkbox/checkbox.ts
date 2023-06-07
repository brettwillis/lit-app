/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {customElement} from 'lit/decorators.js';

import {MdCheckbox} from '@material/web/checkbox/checkbox';
   


declare global {
  interface HTMLElementTagNameMap {
    'lapp-checkbox': LapCheckbox;
  }
}

/**
 * @summary Checkboxes allow users to select one or more items from a set.
 * Checkboxes can turn an option on or off.
 *
 * @description
 * Use checkboxes to:
 * - Select one or more options from a list
 * - Present a list containing sub-selections
 * - Turn an item on or off in a desktop environment
 *
 * @final
 * @suppress {visibility}
 */
@customElement('lapp-checkbox')
export class LapCheckbox extends MdCheckbox {
  // static override styles= [styles, forcedColorsStyles];
}

import { State } from './state';

/**
 * This event is fired to inform a state has updated one of its value
 */
 export class StateEvent extends Event {
  static readonly eventName = 'lit-state-changed';
  readonly key: PropertyKey;
  readonly state: State;

  readonly value: unknown;
  
  /**
   * @param  {PropertyKey} key of the state that has changed
   * @param  {unknown} value for the changed key
   */
  constructor(key: PropertyKey, value: unknown, state: State) {
    super(StateEvent.eventName, {
      cancelable: false,
    });
    this.key = key;
    this.value = value;
    this.state = state;
  }
}

declare global {
  interface HTMLElementEventMap {
    [StateEvent.eventName]: StateEvent;
  }
  interface EventTargetEventMap {
    [StateEvent.eventName]: StateEvent;
  }
}


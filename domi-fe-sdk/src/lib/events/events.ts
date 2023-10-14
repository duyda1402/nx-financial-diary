/**
 * The type of events.
 * @typedef {string}
 * @memberOf Listener
 */
export enum EventsType {
  SESSION_CREATED = "nfd-session-created",
  SESSION_EXPIRE = "nfd-session-expired",
  USER_LOGOUT = "nfd-user-logged-out",
  USER_DELETE = "nfd-user-deleted",
  AUTH_FLOW_COMPLETED = "nfd-auth-flow-completed",
}

/**
 * The data passed in the `nfd-session-created` or `nfd-session-resumed` event.
 *
 * @interface
 * @category SDK
 * @subcategory Events
 * @property {string} jwt - The JSON web token associated with the session. Only present when the Nfd-API allows the JWT to be accessible client-side.
 * @property {number} expirationSeconds - The number of seconds until the JWT expires.
 * @property {string} userId - The user associated with the session.
 */
export interface SessionDetail {
  jwt?: string;
  expirationSeconds: number;
  userId: string;
}

/**
 * The data passed in the `nfd-auth-flow-completed` event.
 *
 * @interface
 * @category SDK
 * @subcategory Events
 * @property {string} userId - The user associated with the removed session.
 */
export interface AuthFlowCompletedDetail {
  userId: string;
}

/**
 * A custom event that includes a detail object.
 *
 * @category SDK
 * @subcategory Events
 * @extends CustomEvent
 * @ignore
 * @param {string} type - The type of the event.
 * @param {T} detail - The detail object to include in the event.
 */
export class CustomEventWithDetail<T> extends CustomEvent<T> {
  // eslint-disable-next-line require-jsdoc
  constructor(type: string, detail: T) {
    super(type, { detail });
  }
}

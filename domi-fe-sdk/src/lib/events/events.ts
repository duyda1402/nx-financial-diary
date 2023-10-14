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

export interface SessionDetail {
  jwt?: string; // The JSON web token associated with the session.
  expirationSeconds: number; //The number of seconds until the JWT expires.
  userId: string; //The user associated with the session.
}

//The user associated with the removed session.
export interface AuthFlowCompletedDetail {
  userId: string;
}

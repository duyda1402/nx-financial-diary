import { SessionDetail } from "./events/events";
import { SessionState } from "./state/session";
import { Cookie } from "./cookie";

interface SessionOptions {
  cookieName: string;
  storageKey: string;
}

/**
 A class representing a session.
 */
export class Session {
  _sessionState: SessionState;
  _cookie: Cookie;

  // eslint-disable-next-line require-jsdoc
  constructor(options: SessionOptions) {
    this._sessionState = new SessionState({ ...options });
    this._cookie = new Cookie({ ...options });
  }

  /**
   Retrieves the session details.

   @returns {SessionDetail} The session details.
   */
  public get(): SessionDetail | null {
    const detail = this._get();
    return Session.validate(detail) ? detail : null;
  }

  /**
   Checks if the user is logged in.

   @returns {boolean} true if the user is logged in, false otherwise.
   */
  public isValid(): boolean {
    const session = this._get();
    return Session.validate(session);
  }

  /**
   Retrieves the session details.

   @ignore
   @returns {SessionDetail} The session details.
   */
  public _get(): SessionDetail {
    this._sessionState.read();

    const userId = this._sessionState.getUserId();
    const expirationSeconds = this._sessionState.getExpirationSeconds();
    const jwt = this._cookie.getAuthCookie();

    return {
      userId,
      expirationSeconds,
      jwt,
    };
  }

  /**
   Checks if the auth flow is completed. The value resets after the next login attempt.
   */
  public isAuthFlowCompleted(): boolean {
    this._sessionState.read();
    return this._sessionState.getAuthFlowCompleted();
  }

  /**
   Validates the session.
   */
  private static validate(detail: SessionDetail): boolean {
    return !!(detail.expirationSeconds > 0 && detail.userId?.length);
  }
}

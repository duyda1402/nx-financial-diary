import { State } from "../index";

/**
 * Options for SessionState
 *
 * @category SDK
 * @subcategory Internal
 * @property {string} CurrentStorageKey - The prefix / name of the local storage keys.
 */
interface SessionStateOptions {
  storageKey: string;
}

/**
 * @interface
 * @category SDK
 * @subcategory Internal
 * @property {Object.<string, CurrentStorageSession>} - A dictionary for mapping users to their states.
 */
export interface CurrentStorageSession {
  expiry: number | undefined;
  userId: string | undefined;
  authFlowCompleted: boolean;
}

/**
 * A class to read and write local storage contents regarding sessions.
 */

class SessionState extends State {
  constructor(options: SessionStateOptions) {
    super(`${options.storageKey}_session`);
  }

  async read(): Promise<SessionState> {
    super.read();

    return this;
  }

  /**
   * Gets the session state.
   *
   * @return {CurrentStorageSession}
   */
  getState(): CurrentStorageSession {
    this.storage.session ||= { expiry: 0, userId: "", authFlowCompleted: false };
    return this.storage.session;
  }

  getExpirationSeconds(): number {
    return State.timeToRemainingSeconds(this.getState().expiry);
  }

  setExpirationSeconds(seconds: number): SessionState {
    this.getState().expiry = State.remainingSecondsToTime(seconds);
    return this;
  }

  getUserId(): string {
    return this.getState().userId!;
  }

  setUserId(userId: string): SessionState {
    this.getState().userId = userId;
    return this;
  }

  getAuthFlowCompleted(): boolean {
    return this.getState().authFlowCompleted;
  }

  setAuthFlowCompleted(completed: boolean): SessionState {
    this.getState().authFlowCompleted = completed;
    return this;
  }

  reset(): SessionState {
    const session = this.getState();

    delete session.expiry;
    delete session.userId;

    return this;
  }
}

export { SessionState };

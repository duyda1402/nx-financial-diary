import { State } from "../index";
import { UserState } from "./index";

/**
 * @interface
 * @category SDK
 * @subcategory Internal
 * @property {string=} id - The UUID of the active passcode.
 * @property {number=} ttl - Timestamp until when the passcode is valid in seconds (since January 1, 1970 00:00:00 UTC).
 * @property {number=} resendAfter - Seconds until a passcode can be resent.
 * @property {email=} email - The email address ID.
 */
export interface LocalStoragePasscode {
  id?: string;
  ttl?: number;
  resendAfter?: number;
  email?: string;
}

/**
 * A class that manages passcode via local storage.
 *
 * @extends UserState
 * @category SDK
 * @subcategory Internal
 */
class PasscodeState extends UserState {
  /**
   * Get the passcode state.
   *
   * @private
   * @param {string} userId - The UUID of the user.
   * @return {LocalStoragePasscode}
   */
  private getState(userId: string): LocalStoragePasscode {
    return (super.getUserState(userId).passcode ||= {});
  }

  /**
   * Reads the current state.
   *
   * @public
   * @return {PasscodeState}
   */
  read(): PasscodeState {
    super.read();

    return this;
  }

  /**
   * Gets the UUID of the active passcode.
   *
   * @param {string} userId - The UUID of the user.
   * @return {string}
   */
  getActiveID(userId: string): string {
    return this.getState(userId).id!;
  }

  /**
   * Sets the UUID of the active passcode.
   *
   * @param {string} userId - The UUID of the user.
   * @param {string} passcodeID - The UUID of the passcode to be set as active.
   * @return {PasscodeState}
   */
  setActiveID(userId: string, passcodeID: string): PasscodeState {
    this.getState(userId).id = passcodeID;

    return this;
  }

  /**
   * Gets the UUID of the email address.
   *
   * @param {string} userId - The UUID of the user.
   * @return {string}
   */
  getEmail(userId: string): string {
    return this.getState(userId).email!;
  }

  /**
   * Sets the UUID of the email address.
   *
   * @param {string} userId - The UUID of the user.
   * @param {string} email - The UUID of the email address.
   * @return {PasscodeState}
   */
  setEmail(userId: string, email: string): PasscodeState {
    this.getState(userId).email = email;

    return this;
  }

  /**
   * Removes the active passcode.
   *
   * @param {string} userId - The UUID of the user.
   * @return {PasscodeState}
   */
  reset(userId: string): PasscodeState {
    const passcode = this.getState(userId);

    delete passcode.id;
    delete passcode.ttl;
    delete passcode.resendAfter;
    delete passcode.email;

    return this;
  }

  /**
   * Gets the TTL in seconds. When the seconds expire, the code is invalid.
   *
   * @param {string} userId - The UUID of the user.
   * @return {number}
   */
  getTTL(userId: string): number {
    return State.timeToRemainingSeconds(this.getState(userId).ttl);
  }

  /**
   * Sets the passcode's TTL and stores it to the local storage.
   *
   * @param {string} userId - The UUID of the user.
   * @param {string} seconds - Number of seconds the passcode is valid for.
   * @return {PasscodeState}
   */
  setTTL(userId: string, seconds: number): PasscodeState {
    this.getState(userId).ttl = State.remainingSecondsToTime(seconds);

    return this;
  }

  /**
   * Gets the number of seconds until when the next passcode can be sent.
   *
   * @param {string} userId - The UUID of the user.
   * @return {number}
   */
  getResendAfter(userId: string): number {
    return State.timeToRemainingSeconds(this.getState(userId).resendAfter);
  }

  /**
   * Sets the number of seconds until a new passcode can be sent.
   *
   * @param {string} userId - The UUID of the user.
   * @param {number} seconds - Number of seconds the passcode is valid for.
   * @return {PasscodeState}
   */
  setResendAfter(userId: string, seconds: number): PasscodeState {
    this.getState(userId).resendAfter = State.remainingSecondsToTime(seconds);

    return this;
  }
}

export { PasscodeState };

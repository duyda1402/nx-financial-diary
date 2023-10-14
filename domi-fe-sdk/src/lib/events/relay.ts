import { SessionDetail, EventsType } from "./events";
import { Listener } from "./listener";
import { Scheduler } from "./scheduler";
import { Dispatcher } from "./dispatcher";
import { Session } from "../session";

/**
 * Options for Relay
 *
 * @category SDK
 * @subcategory Internal
 * @property {string} cookieName - The name of the session cookie set from the SDK.
 * @property {string} localStorageKey - The prefix / name of the local storage keys.
 */
interface RelayOptions {
  cookieName: string;
  localStorageKey: string;
}

/**
 * A class that dispatches events and scheduled events, based on other events.
 *
 * @category SDK
 * @subcategory Internal
 * @extends Dispatcher
 * @param {RelayOptions} options - The options that can be used
 */
export class Relay extends Dispatcher {
  _listener = new Listener();
  _scheduler = new Scheduler();
  _session: Session;

  // eslint-disable-next-line require-jsdoc
  constructor(options: RelayOptions) {
    super({ ...options });
    this._session = new Session({ ...options });
    this.listenEventDependencies();
  }

  /**
   * Removes the scheduled "nfd-session-expired" event and re-schedules a new event with updated expirationSeconds, to
   * ensure the "nfd-session-expired" event won't be triggered too early.
   *
   * @private
   * @param {SessionDetail} detail - The event detail.
   */
  private scheduleSessionExpiredEvent = (detail: SessionDetail) => {
    this._scheduler.removeTasksWithType(EventsType.SESSION_EXPIRE);
    this._scheduler.scheduleTask(
      EventsType.SESSION_EXPIRE,
      () => this.dispatchSessionExpiredEvent(),
      detail.expirationSeconds,
    );
  };

  /**
   * Cancels scheduled "nfd-session-expired" events, to prevent it from being triggered again (e.g. when there are
   * multiple SDK instances).
   *
   * @private
   */
  private cancelSessionExpiredEvent = () => {
    this._scheduler.removeTasksWithType(EventsType.SESSION_EXPIRE);
  };

  /**
   * Handles the "storage" event in case the local storage entry, that contains the session detail has been changed by
   * another window. Depending on the new value of `expirationSeconds`, it either dispatches a "nfd-session-created"
   * or a "nfd-session-expired" event.
   *
   * @private
   * @param {StorageEvent} event - The storage event object.
   */
  private handleStorageEvent = (event: StorageEvent) => {
    if (event.key !== "nfd_session") return;

    const sessionDetail = this._session.get();

    if (!sessionDetail) {
      this.dispatchSessionExpiredEvent();
      return;
    }

    if (this._session.isAuthFlowCompleted()) {
      this.dispatchAuthFlowCompletedEvent({ userId: sessionDetail.userId });
      return;
    }

    this.dispatchSessionCreatedEvent(sessionDetail);
  };

  /**
   * Listens for events sent in the current browser.
   *
   * @private
   */
  private listenEventDependencies() {
    this._listener.onSessionCreated(this.scheduleSessionExpiredEvent);
    this._listener.onSessionExpired(this.cancelSessionExpiredEvent);
    this._listener.onUserDeleted(this.cancelSessionExpiredEvent);
    this._listener.onUserLoggedOut(this.cancelSessionExpiredEvent);

    // Handle cases, where the session has been changed by another window.
    window.addEventListener("storage", this.handleStorageEvent);

    const sessionDetail = this._session.get();

    if (sessionDetail) {
      this.scheduleSessionExpiredEvent(sessionDetail);
    }
  }
}

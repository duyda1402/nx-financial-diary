import { SessionState } from "../state/session";
import { AuthFlowCompletedDetail, EventsType, SessionDetail } from "./events";
import EventEmitter from "events";

interface DispatcherOptions {
  storageKey: string;
}

export class Dispatcher extends EventEmitter {
  _sessionState: SessionState;

  constructor(options: DispatcherOptions) {
    super();
    this._sessionState = new SessionState({ ...options });
  }

  //dispatch init
  private dispatch<T = Record<string, string>>(type: string, data: T) {
    this.emit(type, { data });
  }

  // Dispatches a "session-created" event to the document with the specified detail.
  public dispatchSessionCreatedEvent(data: SessionDetail) {
    this.dispatch(EventsType.SESSION_CREATED, data);
  }

  //Dispatches a "session-expired" event to the document.
  public dispatchSessionExpiredEvent() {
    this.dispatch(EventsType.SESSION_EXPIRE, null);
  }

  //Dispatches a "user-logged-out" event to the document.
  public dispatchUserLoggedOutEvent() {
    this.dispatch(EventsType.USER_LOGOUT, null);
  }

  // Dispatches a "user-deleted" event to the document.
  public dispatchUserDeletedEvent() {
    this.dispatch(EventsType.USER_DELETE, null);
  }

  // Dispatches a "auth-flow-completed" event to the document with the specified detail.
  public async dispatchAuthFlowCompletedEvent(data: AuthFlowCompletedDetail) {
    (await this._sessionState.read()).setAuthFlowCompleted(true).write();
    this.dispatch(EventsType.AUTH_FLOW_COMPLETED, data);
  }
}

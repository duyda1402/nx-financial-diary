import { Throttle } from "../throttle";
import { SessionDetail, AuthFlowCompletedDetail, EventsType } from "./events";
import EventEmitter from "events";
/**
 * A callback function to be executed when an event is triggered.
 */
type CallbackFunc<T> = (data: T) => any;

/**
 * A wrapped callback function that will execute the original callback.
 */
type WrappedCallback<T> = (data: T) => void;

/**
 * A function returned when adding an event listener. The function can be called to remove the corresponding event listener.
 */
type CleanupFunc = () => void;

interface EventListenerParams<T> {
  callback: CallbackFunc<T>;
  once?: boolean;
}

interface EventListenerWithTypeParams<T> extends EventListenerParams<T> {
  type: string; //The type of the event.
  throttle?: boolean; //Whether the event listener should be throttled.
}

export class Listener {
  public throttleLimit = 1000;
  _throttle = Throttle.throttle;
  _emitter;
  constructor() {
    this._emitter = new EventEmitter({});
  }

  private wrapCallback<T>(callback: CallbackFunc<T>, throttle: boolean): WrappedCallback<T> {
    const wrappedCallback = (data: T) => callback(data);
    // Throttle the listener if multiple SDK instances could trigger the same event at the same time,
    // but the callback function should only be executed once.
    if (throttle) {
      return this._throttle(wrappedCallback, this.throttleLimit, {
        leading: true,
        trailing: false,
      });
    }

    return wrappedCallback;
  }

  private addEventListenerWithType<T>({
    type,
    callback,
    once = false,
    throttle = false,
  }: EventListenerWithTypeParams<T>): CleanupFunc {
    const wrappedCallback = this.wrapCallback(callback, throttle);
    if (once) {
      this._emitter.once(type, wrappedCallback);
    } else {
      this._emitter.on(type, wrappedCallback);
    }

    return () => this._emitter.removeListener(type, callback);
  }

  private static mapEventParams<T>(
    type: string,
    { once, callback }: EventListenerParams<T>,
    throttle?: boolean,
  ): EventListenerWithTypeParams<T> {
    return {
      type,
      callback,
      once,
      throttle,
    };
  }

  private addEventListener<T>(type: string, params: EventListenerParams<T>, throttle?: boolean) {
    return this.addEventListenerWithType(Listener.mapEventParams(type, params, throttle));
  }

  public onSessionCreated(callback: CallbackFunc<SessionDetail>, once?: boolean): CleanupFunc {
    return this.addEventListener(EventsType.SESSION_CREATED, { callback, once }, true);
  }

  public onSessionExpired(callback: CallbackFunc<null>, once?: boolean): CleanupFunc {
    return this.addEventListener(EventsType.SESSION_EXPIRE, { callback, once }, true);
  }

  public onUserLoggedOut(callback: CallbackFunc<null>, once?: boolean): CleanupFunc {
    return this.addEventListener(EventsType.USER_LOGOUT, { callback, once });
  }

  public onUserDeleted(callback: CallbackFunc<null>, once?: boolean): CleanupFunc {
    return this.addEventListener(EventsType.USER_DELETE, { callback, once });
  }

  public onAuthFlowCompleted(callback: CallbackFunc<AuthFlowCompletedDetail>, once?: boolean): CleanupFunc {
    return this.addEventListener(EventsType.AUTH_FLOW_COMPLETED, { callback, once });
  }
}

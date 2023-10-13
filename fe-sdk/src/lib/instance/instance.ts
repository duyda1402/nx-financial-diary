import axios, { AxiosInstance, CreateAxiosDefaults, AxiosResponse } from 'axios'
import { PasscodeState } from '../state/users/passcode';
import { Dispatcher } from '../events/dispatcher';
import { Cookie } from '../cookie';
import { Tokens } from '../dto';
import { SessionState } from '../state/session';

export type ApiOptions = CreateAxiosDefaults<any> & { cookieName: string, localStorageKey: string }


class Instance {
  instance: AxiosInstance;
  timeout: number;
  passcodeState: PasscodeState
  sessionState: SessionState;
  cookie: Cookie;
  dispatcher: Dispatcher;
  api: string
  // eslint-disable-next-line require-jsdoc
  constructor(api: string, options: ApiOptions) {
    this.timeout = options?.timeout || 10000
    this.api = api
    this.instance = axios.create({
      baseURL: api,
      ...options,
      timeout: this.timeout
    });
    this.passcodeState = new PasscodeState(options.cookieName);
    this.cookie = new Cookie({ cookieName: options.cookieName });
    this.dispatcher = new Dispatcher({ localStorageKey: options.localStorageKey });
    this.sessionState = new SessionState({ localStorageKey: options.localStorageKey });
  }

  processResponseHeadersOnLogin(userId: string, response: AxiosResponse) {
    let accessToken = "";
    let refreshToken = "";
    let expirationSeconds = 0;

    if (response?.data?.data) {
      const tokens = response?.data?.data as Tokens
      accessToken = tokens.accessToken
      refreshToken = tokens.refreshToken
      expirationSeconds = tokens.expiration
    }

    if (accessToken) {
      const secure = !!this.api.match("^https://");
      const expires = new Date(new Date().getTime() + expirationSeconds * 1000);
      this.cookie.setAuthCookie(accessToken, { secure, expires });
    }
    if (refreshToken) {
      const secure = !!this.api.match("^https://");
      const expires = new Date(new Date().getTime() + expirationSeconds * 1000);
      this.cookie.setAuthRefresh(refreshToken, { secure, expires });
    }

    this.passcodeState.read().reset(userId).write();

    if (expirationSeconds > 0) {
      this.sessionState.read();
      this.sessionState.setExpirationSeconds(expirationSeconds);
      this.sessionState.setUserId(userId);
      this.sessionState.setAuthFlowCompleted(false);
      this.sessionState.write();
      this.dispatcher.dispatchSessionCreatedEvent({
        jwt: accessToken,
        userId,
        expirationSeconds,
      });
    }
  }
}

export { Instance };
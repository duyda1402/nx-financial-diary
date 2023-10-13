import { ConfigUser } from "../lib/auth/config";
// import { PasscodeClient } from "./lib/client/PasscodeClient";
// import { PasswordClient } from "./lib/client/PasswordClient";
import { UserClient } from "../lib/auth/user";
// import { WebauthnClient } from "./lib/client/WebauthnClient";
// import { EmailClient } from "./lib/client/EmailClient";
// import { ThirdPartyClient } from "./lib/client/ThirdPartyClient";
// import { TokenClient } from "./lib/client/TokenClient";
// import { Listener } from "./lib/events/Listener";
// import { Relay } from "./lib/events/Relay";
// import { Session } from "../lib/state/session";

/**
 * The options for the sdk class
 *
 * @interface
 * @property {number=} timeout - The http request timeout in milliseconds. Defaults to 13000ms
 * @property {string=} cookieName - The name of the session cookie set from the SDK. Defaults to "nfd-session"
 * @property {string=} localStorageKey - The prefix / name of the local storage keys. Defaults to "nfd-key"
 */
export interface NfdOptions {
     timeout?: number;
     cookieName?: string;
     localStorageKey?: string;
}

/**
 * A class that bundles all available SDK functions.
 *
 * @extends {Listener}
 * @param {string} api - The URL of your be API instance
 * @param {NfdOptions=} options - The options that can be used
 */
class NFD extends Listener {
     api: string;
     config: ConfigUser;
     user: UserClient;
     // webauthn: WebauthnClient;
     passcode: PasscodeClient;
     //email: EmailClient;
     //thirdParty: ThirdPartyClient;
     token: TokenClient;
     relay: Relay;
     session: Session;

     // eslint-disable-next-line require-jsdoc
     constructor(api: string, options?: NfdOptions) {
          super();
          const opts: InternalOptions = {
               timeout: 13000,
               cookieName: "nfd-session",
               localStorageKey: "nfd-key",
          };
          if (options?.cookieName !== undefined) {
               opts.cookieName = options.cookieName;
          }
          if (options?.timeout !== undefined) {
               opts.timeout = options.timeout;
          }
          if (options?.localStorageKey !== undefined) {
               opts.localStorageKey = options.localStorageKey;
          }

          this.api = api;
          /**
           *  @public
           *  @type {ConfigUser}
           */
          this.config = new ConfigUser(api, opts);
          /**
           *  @public
           *  @type {UserClient}
           */
          this.user = new UserClient(api, opts);
          /**
           *  @public
           *  @type {WebauthnClient}
           */
          // this.webauthn = new WebauthnClient(api, opts);
          // /**
          //  *  @public
          //  *  @type {PasswordClient}
          //  */
          // this.password = new PasswordClient(api, opts);
          // /**
          //  *  @public
          //  *  @type {PasscodeClient}
          //  */
          this.passcode = new PasscodeClient(api, opts);
          /**
           *  @public
           *  @type {EmailClient}
           */
          this.email = new EmailClient(api, opts);
          /**
           *  @public
           *  @type {ThirdPartyClient}
           */
          this.thirdParty = new ThirdPartyClient(api, opts);
          /**
           *  @public
           *  @type {TokenClient}
           */
          this.token = new TokenClient(api, opts);
          /**
           *  @public
           *  @type {Relay}
           */
          this.relay = new Relay({ ...opts });
          /**
           *  @public
           *  @type {Session}
           */
          this.session = new Session({ ...opts });
     }
}

// eslint-disable-next-line require-jsdoc
export interface InternalOptions {
     timeout: number;
     cookieName: string;
     localStorageKey: string;
}

export { NFD };

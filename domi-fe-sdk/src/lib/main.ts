import { UserClient } from "./auth/user";
import { Listener } from "./events/listener";
import { Relay } from "./events/relay";
import { Session } from "./session";

export interface DomiOptions {
  timeout?: number;
  cookieName?: string;
  storageKey?: string;
}

class DomiCore extends Listener {
  api: string;
  relay: Relay;
  session: Session;
  user: UserClient;

  constructor(api: string, options?: DomiOptions) {
    super();
    const opts: InternalOptions = {
      timeout: options?.timeout || 13000,
      cookieName: options?.cookieName || "domi_cookie",
      storageKey: options?.storageKey || "domi_storage",
    };

    this.api = api;

    this.relay = new Relay({ ...opts });

    this.session = new Session({ ...opts });

    this.user = new UserClient(api, opts);
  }
}
export interface InternalOptions {
  timeout: number;
  cookieName: string;
  storageKey: string;
}

export { DomiCore };

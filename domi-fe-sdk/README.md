# @nfd/domi-fe-sdk

This library was generated with [Nx](https://nx.dev).

This package utilizes the [Api-Core](https://documenter.getpostman.com/view/16887408/2s9YJjRJvE)

## Running unit tests

Run `npx nx test domi-fe-sdk` to execute the unit tests via [Jest](https://jestjs.io).

## Usage

Import as a module:

```typescript
import { DomiCore } from "@nfd/domi-fe-sdk";

const domiCore = new DomiCore("http://localhost:3000/v1/api");
```

### Options

You can pass certain options, when creating a new `Domi` instance:

```js
const defaultOptions = {
  timeout: 13000, // The timeout (in ms) for the HTTP requests.
  cookieName: "domi-cookie", // The cookie name under which the session token is set.
  localStorageKey: "domi-key", // The prefix / name of the localStorage keys.
};
const domiCore = new DomiCore("http://localhost:3000/v1/api", defaultOptions);
```

# Exports

### SDK

- `Domi` - A class that bundles all functionalities.

### Client Classes

- `ConfigClient` - A class to fetch configurations.
- `UserClient` - A class to manage users.
- `PasscodeClient` - A class to handle passcode logins.
- `ThirdPartyClient` - A class to handle social logins.
- `TokenClient` - A class that handles the exchange of one time tokens for session JWT.

### DTO Interfaces

- `PasswordConfig`
- `EmailConfig`
- `AccountConfig`
- `Config`
- `TokenFinalized`
- `UserInfo`
- `Me`
- `Credential`
- `Passcode`
- `Attestation`
- `Email`
- `Emails`
- `Identity`

### Event Interfaces

- `SessionDetail`
- `AuthFlowCompletedDetail`

### Event Types

- `EventsType`

  SESSION_CREATED = "nfd-session-created",

  SESSION_EXPIRE = "nfd-session-expired",

  USER_LOGOUT = "nfd-user-logged-out",

  USER_DELETE = "nfd-user-deleted",

  AUTH_FLOW_COMPLETED = "nfd-auth-flow-completed",

### Error Classes

- `DomiError`
- `TechnicalError`
- `ConflictError`
- `RequestTimeoutError`
- `InvalidPasswordError`
- `InvalidPasscodeError`
- `PasscodeExpiredError`
- `MaxNumOfPasscodeAttemptsReachedError`
- `NotFoundError`
- `TooManyRequestsError`
- `UnauthorizedError`

## Examples

### Get the current user / Validate the JWT against the Domi API

The Domi API issues a JWT when a user logs in. For certain actions, like obtaining the user object, a valid JWT is
required. The following example shows how to get the user object of the current user, or to identify that the user is
not logged in:

```typescript
import { DomiCore, UnauthorizedError } from "@nfd/domi-fe-sdk";

const domiCore = new DomiCore("http://localhost:3000/v1/api");

try {
  const user = await domiCore.user.getCurrent();

  // A valid JWT is in place so that the user object was able to be fetched.
} catch (e) {
  if (e instanceof UnauthorizedError) {
    // Handler error
  }
}
```

### Custom Events

You can bind callback functions to different custom events. The callback function will be called when the event happens
and an object will be passed in, containing event details. The event binding works as follows:

```typescript
// Controls the optional `once` parameter. When set to `true` the callback function will be called only once.
const once = false;

const removeEventListener = domiCore.onSessionCreated((eventDetail) => {
  // Your code...
}, once);
```

The following events are available:

- "auth-flow-completed": Will be triggered after a session has been created and the user has completed possible
  additional steps (e.g. passkey registration or password recovery) via the `<Domi-auth>` element.

```typescript
domiCore.onAuthFlowCompleted((authFlowCompletedDetail) => {
  // Login, registration or recovery has been completed successfully. You can now take control and redirect the
  // user to protected pages.
  console.info(
    `User successfully completed the registration or authorization process (user-id: "${authFlowCompletedDetail.userId}")`,
  );
});
```

```typescript
domiCore.onSessionCreated((sessionDetail) => {
  // A new JWT has been issued.
  console.info(`Session created or updated (user-id: "${sessionDetail.userId}", jwt: ${sessionDetail.jwt})`);
});
```

- "session-expired": Will be triggered when the session has expired, or when the session has been removed in
  another browser window, because the user has logged out, or deleted the account.

```typescript
domiCore.onSessionExpired(() => {
  // You can redirect the user to a login page or show the `<Domi-auth>` element, or to prompt the user to log in again.
  console.info("Session expired");
});
```

- "user-logged-out": Will be triggered, when the user actively logs out. In other browser windows, a "Domi-session-expired" event
  will be triggered at the same time.

```typescript
domiCore.onUserLoggedOut(() => {
  // You can redirect the user to a login page or show the `<Domi-auth>` element.
  console.info("User logged out");
});
```

- "user-deleted": Will be triggered when the user has deleted the account. In other browser windows, a "Domi-session-expired" event
  will be triggered at the same time.

```typescript
domiCore.onUserDeleted(() => {
  // You can redirect the user to a login page or show the `<Domi-auth>` element.
  console.info("User has been deleted");
});
```

## License

The `domi-fe-sdk` project is licensed under the [MIT License](LICENSE).

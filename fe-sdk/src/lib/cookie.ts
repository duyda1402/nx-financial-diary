import JSCookie from "js-cookie";

/**
 * Options for Cookie
 *
 * @category SDK
 * @subcategory Internal
 * @property {string} cookieName - The name of the session cookie set from the SDK.
 */
interface CookieOptions {
     cookieName: string;
}

/**
 * Options for setting the auth cookie.
 *
 * @category SDK
 * @subcategory Internal
 * @property {boolean} secure - Indicates if the Secure attribute of the cookie should be set.
 * @property {number | Date | undefined} expires - The expiration of the cookie.
 */
interface SetAuthCookieOptions {
     secure?: boolean;
     expires?: number | Date | undefined;
}

/**
 * A class to manage cookies.
 *
 * @category SDK
 * @subcategory Internal
 * @param {CookieOptions} options - The options that can be used
 */
export class Cookie {
     authCookieName: string;

     constructor(options: CookieOptions) {
          this.authCookieName = options.cookieName;
     }

     getAuthCookie(): string | undefined {
          return JSCookie.get(this.authCookieName);
     }

     getAuthRefresh(): string | undefined {
          return JSCookie.get(this.authCookieName);
     }

     setAuthCookie(
          token: string,
          options: SetAuthCookieOptions = { secure: true },
     ) {
          JSCookie.set(this.authCookieName, token, options);
     }

     setAuthRefresh(
          token: string,
          options: SetAuthCookieOptions = { secure: true },
     ) {
          JSCookie.set(this.authCookieName + "_refresh", token, options);
     }

     removeAuthCookie() {
          JSCookie.remove(this.authCookieName);
     }

     removeAuthRefresh() {
          JSCookie.remove(this.authCookieName + "_refresh");
     }
}

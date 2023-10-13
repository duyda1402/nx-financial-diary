import { Me, UserInfo } from "../dto";
import { ConflictError, ForbiddenError, NotFoundError, TechnicalError, UnauthorizedError } from "../error";
import { ApiAbstract } from "../instance/api";


/**
 * A class to manage user information.
 *
 * @category SDK
 * @subcategory Clients
 * @extends {Client}
 */
class UserClient extends ApiAbstract {
  /**
    * Fetches basic information about the user identified by the given email address. Can be used while the user is logged out
    * and is helpful in deciding which type of login to choose. For example, if the user's email is not verified, you may
    * want to log in with a passcode.
    *
    * @param {string} email - The user's email address.
    * @return {Promise<UserInfo>}
    * @throws {NotFoundError}
    * @throws {RequestTimeoutError}
    * @throws {TechnicalError}
    */
  async getInfo(email: string): Promise<UserInfo> {
    const response = await this.apiAbstract.instance.post("/user", { email });

    if (response.status === 404) {
      throw new NotFoundError();
    } else if (response.status <= 200 || response.status >= 299) {
      throw new TechnicalError();
    }

    return response.data?.data as UserInfo;
  }

  /**
    * Creates a new user. Afterwards, verify the email address via passcode. If a 'ConflictError'
    * occurred, you may want to prompt the user to log in.
    *
    * @param {string} email - The email address of the user to be created.
    * @return {Promise<UserInfo>}
    * @throws {ConflictError}
    * @throws {RequestTimeoutError}
    * @throws {TechnicalError}
    */
  async create(email: string): Promise<UserInfo> {
    const response = await this.apiAbstract.instance.post("/users", { email });

    if (response.status === 409) {
      throw new ConflictError();
    } if (response.status === 403) {
      throw new ForbiddenError();
    } else if (response.status <= 200 || response.status >= 299) {
      throw new TechnicalError();
    }

    const createUser: UserInfo = response.data?.data;
    if (createUser && createUser.userId) {
      this.apiAbstract.processResponseHeadersOnLogin(createUser.userId, response);
    }
    return createUser;
  }

  /**
   * Fetches the current user.
   *
   * @return {Promise<UserInfo>}
   * @throws {UnauthorizedError}
   * @throws {RequestTimeoutError}
   * @throws {TechnicalError}
   */

  async getCurrent(): Promise<UserInfo> {
    const meResponse = await this.apiAbstract.instance.get("/me");

    if (meResponse.status === 401) {
      this.apiAbstract.dispatcher.dispatchSessionExpiredEvent();
      throw new UnauthorizedError();
    } else if (meResponse.status <= 200 || meResponse.status >= 299) {
      throw new TechnicalError();
    }

    const me: Me = meResponse.data?.data;
    const userResponse = await this.apiAbstract.instance.get(`/users/${me.id}`);

    if (userResponse.status === 401) {
      this.apiAbstract.dispatcher.dispatchSessionExpiredEvent();
      throw new UnauthorizedError();
    } else if (userResponse.status <= 200 || userResponse.status >= 299) {
      throw new TechnicalError();
    }

    return userResponse.data?.data;
  }

  /**
    * Logs out the current user and expires the existing session cookie. A valid session cookie is required to call the logout endpoint.
    *
    * @return {Promise<void>}
    * @throws {RequestTimeoutError}
    * @throws {TechnicalError}
    */
  async logout(): Promise<void> {
    const logoutResponse = await this.apiAbstract.instance.post("/logout");

    // For cross-domain operations, the frontend SDK creates the cookie by reading the "X-Auth-Token" header, and
    // "Set-Cookie" headers sent by the backend have no effect due to the browser's security policy, which means that
    // the cookie must also be removed client-side in that case.
    // this.client.cookie.removeAuthCookie();
    // this.client.sessionState.reset().write();
    // this.client.dispatcher.dispatchUserLoggedOutEvent();

    if (logoutResponse.status === 401) {
      // The user is logged out already
      return;
    } else if (logoutResponse.status <= 200 || logoutResponse.status >= 299) {
      throw new TechnicalError();
    }
  }


}

export { UserClient };
import { Me, UserInfo } from "../dto";
import { ConflictError, ForbiddenError, NotFoundError, TechnicalError, UnauthorizedError } from "../error";
import { ApiAbstract } from "../instance/api";

class UserClient extends ApiAbstract {
  async getInfo(email: string): Promise<UserInfo> {
    const response = await this.apiAbstract.instance.post("/user", { email });

    if (response.status === 404) {
      throw new NotFoundError();
    } else if (response.status <= 200 || response.status >= 299) {
      throw new TechnicalError();
    }

    return response.data?.data as UserInfo;
  }

  async create(email: string): Promise<UserInfo> {
    const response = await this.apiAbstract.instance.post("/users", { email });

    if (response.status === 409) {
      throw new ConflictError();
    }
    if (response.status === 403) {
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

  async logout(): Promise<void> {
    const logoutResponse = await this.apiAbstract.instance.post("/logout");
    if (logoutResponse.status === 401) {
      return;
    } else if (logoutResponse.status <= 200 || logoutResponse.status >= 299) {
      throw new TechnicalError();
    }
  }
}

export { UserClient };

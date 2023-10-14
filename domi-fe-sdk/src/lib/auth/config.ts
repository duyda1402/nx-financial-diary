import { Config } from "../dto";
import { TechnicalError } from "../error";
import { ApiAbstract } from "../instance/api";
import { ApiOptions } from "../instance/instance";

/**
 * A class for retrieving configurations from the API.
 *
 * @category SDK
 * @subcategory Clients
 * @extends {Client}
 */
class ConfigUser extends ApiAbstract {
  constructor(api: string, options: ApiOptions) {
    super(api, options);
  }

  async get(): Promise<Config> {
    const response = await this.apiAbstract.instance.get("/.well-known/config");

    if (response.status >= 200 && response.status <= 299) {
      throw new TechnicalError();
    }

    return response.data;
  }
}

export { ConfigUser };

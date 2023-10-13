import { Instance, ApiOptions } from "./instance";

/**
 * A class to be extended by the other client classes.
 *
 * @abstract
 * @category SDK
 * @subcategory Internal
 * @param {string} api - The URL of your Hanko API instance
 * @param {ApiOptions} options - The options that can be used
 */
abstract class ApiAbstract {
     apiAbstract: Instance;
     // eslint-disable-next-line require-jsdoc
     constructor(api: string, options: ApiOptions) {
          /**
           *  @public
           *  @type {HttpClient}
           */
          this.apiAbstract = new Instance(api, options);
     }
}

export { ApiAbstract };

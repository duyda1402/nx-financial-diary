import { CurrentStorageUsers } from "./users/index";
import { CurrentStorageSession } from "./session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base64ToJson, jsonToBase64 } from "../utils";
interface CurrentStorage {
  users?: CurrentStorageUsers;
  session?: CurrentStorageSession;
}

/**
 * A class to read and write local storage contents.
 *
 * @abstract
 * @param {string} key - The local storage key.
 * @category SDK
 * @subcategory Internal
 */
abstract class State {
  key: string;
  storage: CurrentStorage;

  constructor(key: string) {
    this.key = key;
    this.storage = {};
  }

  /**
   * Reads and decodes the stored data.
   *
   * @return {State}
   */
  async read(): Promise<State> {
    // let store: CurrentStorage;

    try {
      const data = await AsyncStorage.getItem(this.key);
      if (data) {
        this.storage = base64ToJson(data);
      }
    } catch (e) {
      this.storage = {};
      return this;
    }

    return this;
  }

  /**
   * Encodes and writes the data to the storage.
   *
   * @return {State}
   */
  write(): State {
    try {
      const encoded = jsonToBase64(this.storage);
      AsyncStorage.setItem(this.key, encoded);
    } catch (err: any) {
      console.log(err);
    }
    return this;
  }

  static timeToRemainingSeconds(time = 0) {
    return time - Math.floor(Date.now() / 1000);
  }

  static remainingSecondsToTime(seconds = 0) {
    return Math.floor(Date.now() / 1000) + seconds;
  }
}

export { State };
export type { CurrentStorage };

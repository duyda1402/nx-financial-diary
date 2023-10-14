import { State } from "../index";
import { CurrentStoragePasscode } from "./passcode";

interface CurrentStorageUser {
  passcode?: CurrentStoragePasscode;
}

export interface CurrentStorageUsers {
  [userId: string]: CurrentStorageUser;
}

abstract class UserState extends State {
  /**
   * Gets the state of the specified user.
   */
  getUserState(userId: string): CurrentStorageUser {
    this.storage.users ||= {};

    if (!Object.prototype.hasOwnProperty.call(this.storage.users, userId)) {
      this.storage.users[userId] = {};
    }

    return this.storage.users[userId];
  }
}

export { UserState };

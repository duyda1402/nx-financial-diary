/**
 * @interface
 * @category SDK
 * @subcategory DTO
 * @property {PasswordConfig} password - The password configuration.
 * @property {EmailConfig} emails - The email configuration.
 * @property {string[]} providers - The enabled third party providers.
 * @property {AccountConfig} account - Controls the behaviour regarding user accounts.
 */
export interface Config {
     password: PasswordConfig;
     emails: EmailConfig;
     providers: string[];
     account: AccountConfig;
}

/**
 * @interface
 * @category SDK
 * @subcategory DTO
 * @property {boolean} enabled - Indicates passwords are enabled, so the API accepts login attempts using passwords.
 * @property {number} min_password_length - The minimum length of a password. To be used for password validation.
 */
export interface PasswordConfig {
     enabled: boolean;
     min_password_length: number;
}

/**
 * @interface
 * @category SDK
 * @subcategory DTO
 * @property {boolean} require_verification - Indicates that email addresses must be verified.
 * @property {number} max_num_of_addresses - The maximum number of email addresses a user can have.
 */
export interface EmailConfig {
     require_verification: boolean;
     max_num_of_addresses: number;
}

/**
 * @interface
 * @category SDK
 * @subcategory DTO
 * @property {boolean} allow_deletion - Indicates the current user is allowed to delete the account.
 * @property {boolean} allow_signup - Indicates the current user is allowed to sign up.
 */
export interface AccountConfig {
     allow_deletion: boolean;
     allow_signup: boolean;
}


export interface UserInfo {
     email: string,
     createAt: Date,
     updateAt: Date,
     id: string | number,
     userId: string
     isVerified: boolean
     displayName?: string,
     profileUrl?: string,
     lastedLoginAt?: Date,
}

/**
 * @interface
 * @category SDK
 * @subcategory DTO
 * @property {string} id - The UUID of the current user.
 * @ignore
 */
export interface Me {
     id: string;
}

export type Tokens = {
     accessToken: string;
     refreshToken: string;
     expiration: number
}
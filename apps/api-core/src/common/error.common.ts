import { MessageCode } from "./enum/message-code.enum";

export const ERROR_UNAUTHORIZED = {
  code: MessageCode.UNAUTHORIZED,
  message: "Unauthorized",
};

export const ERROR_NOT_FOUND = {
  code: MessageCode.NOT_FOUND,
  message: "Not Found",
};

export const OTP_EXPIRED = {
  code: MessageCode.BAD_REQUEST,
  message: "Otp expired",
};

export const OTP_NOT_AVAILABLE = {
  code: MessageCode.BAD_REQUEST,
  message: "Otp is not available",
};

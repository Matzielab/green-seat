import { Config } from "green-seat.config";

export const hasAllowedAuth = (userMail: string) => {
  if (!userMail) return false;
  else if (Config.authorizedDomains.length > 0) {
    const domain = userMail.split("@")[1];
    if (!domain || !Config.authorizedDomains.includes(domain)) {
      return false;
    }
  } else if (Config.authorizedEmails.length > 0) {
    if (!Config.authorizedEmails.includes(userMail)) {
      return false;
    }
  }

  return true;
};

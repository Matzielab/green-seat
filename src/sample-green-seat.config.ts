type ConfigType = {
  // Set these arrays to limit who can login to the app, if none are set, anyone can login!
  authorizedDomains: string[];
  authorizedEmails: string[];

  // Set this to your reCAPTCHA Enterprise key if app check is enabled, if not set, app check will be disabled
  appCheckToken?: string;
};

export const Config: ConfigType = {
  authorizedDomains: [], // example "mycompany.com", any email from this domain will be allowed
  authorizedEmails: [], // example "mathias@mycompany.com", only this email will be allowed
  appCheckToken: "",
};

export type VisaParams = {
  company: {
    id: string;
    domain: string;
    privateKey: string;
  };
  environment: "production" | "test";
  logLevel: "silent" | "info" | "error" | "debug";
};

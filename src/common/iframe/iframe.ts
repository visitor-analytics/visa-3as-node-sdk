import { AccessToken } from "../../token-signing";

export class IFrameUtils {
  //check env?
  DEV_DASHBOARD_BASE_URI = "";
  PROD_DASHBOARD_BASE_URI = "";

  //check env: "dev"? In http-client.ts there was only test and production
  constructor(
    private readonly accessToken: AccessToken,
    private readonly env: "test" | "production"
  ) {}

  generateDashboardUri(): string {
    const dashboardUri =
      this.env === "test"
        ? this.DEV_DASHBOARD_BASE_URI
        : this.PROD_DASHBOARD_BASE_URI;

    const dashboardUriString = dashboardUri + "?intpc_token" + this.accessToken;

    return dashboardUriString;
  }
}

import { AuthUtils } from "../auth/auth";

export class IFrameUtils {
  DEV_DASHBOARD_BASE_URL = "https://dev-dashboard.va-endpoint.com";
  PROD_DASHBOARD_BASE_URL = "";

  constructor(
    private readonly auth: AuthUtils,
    private readonly env: "dev" | "production"
  ) {}

  generateDashboardUrl(intpcId: string, intpcWebsiteId: string): string {
    const dashboardUrl =
      this.env === "dev"
        ? this.DEV_DASHBOARD_BASE_URL
        : this.PROD_DASHBOARD_BASE_URL;

    const iframeUrl =
      dashboardUrl +
      "?intpc_token=" +
      this.auth.generateINTPcAccessToken(intpcId).value +
      "&externalWebsiteId=" +
      intpcWebsiteId;

    return iframeUrl;
  }
}

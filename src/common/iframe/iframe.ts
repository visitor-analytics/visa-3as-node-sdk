import { AuthUtils } from "../auth/auth";

export class IFrameUtils {
  DEV_DASHBOARD_BASE_URL = "https://dev-dashboard-3as.va-endpoint.com";
  STAGE_DASHBOARD_BASE_URL = "https://stage-dashboard-3as.va-endpoint.com";
  PRODUCTION_DASHBOARD_BASE_URL = "https://app-3as.visitor-analytics.io";

  constructor(
    private readonly auth: AuthUtils,
    private readonly env: "dev" | "stage" | "production"
  ) {}

  generateDashboardUrl(intpcId: string, intpcWebsiteId: string): string {
    let dashboardUrl;

    switch (this.env) {
      case "dev":
        dashboardUrl = this.DEV_DASHBOARD_BASE_URL;
        break;
      case "stage":
        dashboardUrl = this.STAGE_DASHBOARD_BASE_URL;
        break;
      case "production":
        dashboardUrl = this.PRODUCTION_DASHBOARD_BASE_URL;
        break;
      default:
        throw new Error("Unsupported iframe env: " + this.env);
    }

    const iframeUrl =
      dashboardUrl +
      "?intpc_token=" +
      this.auth.generateINTPcAccessToken(intpcId).value +
      "&externalWebsiteId=" +
      intpcWebsiteId;

    return iframeUrl;
  }
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://pharmacy.prequest.com.ng";

export const API_BASE_URL_PROXY =
  process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3000";

export const PORT = process.env.NEXT_PUBLIC_PORT || 3000;

export const API_NOTIFICATION_URL = "/payvantage-notification";

export const API_REPORT_URL = "/report";

export const API_USSD = "/ussd";

export const API_PATH = process.env.NEXT_PUBLIC_API_PATH || "api";

export const sessionStorageName = "agent_request";

export const GUEST_ROUTES = ["/login", "/signup"];

export const DASHBOARD_ROUTE = ["/dashboard"];

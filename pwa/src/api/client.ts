import {isTokenExpired} from "../lib/jwt";

export class ApiClient {
  private static getToken(): string | null {
    return localStorage.getItem("token");
  }

  private static removeToken() {
    localStorage.removeItem("token");
  }

  public static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = new Headers(options.headers || {});

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (!headers.has("accept")) {
      headers.set("accept", "application/json");
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    // 3. Execute request
    const response = await fetch(endpoint, config);

    // 4. Handle 401 Unauthorized globally
    if (response.status === 401) {
      console.warn("Unauthorized request. Logging out.");
      this.removeToken();
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    // 5. Handle other errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    // 6. Return typed response
    // Check if response has content before parsing JSON
    const text = await response.text();
    return text ? JSON.parse(text) : {} as T;
  }

  public static async requestSecured<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();

    // 1. Pre-flight check: Is token expired?
    if (token && isTokenExpired(token)) {
      console.warn("Token expired. Logging out.");
      this.removeToken();
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    // 2. Prepare headers
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (!headers.has("accept")) {
      headers.set("accept", "application/json");
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    // 3. Execute request
    const response = await fetch(endpoint, config);

    // 4. Handle 401 Unauthorized globally
    if (response.status === 401) {
      console.warn("Unauthorized request. Logging out.");
      this.removeToken();
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    // 5. Handle other errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    // 6. Return typed response
    // Check if response has content before parsing JSON
    const text = await response.text();
    return text ? JSON.parse(text) : {} as T;
  }
}

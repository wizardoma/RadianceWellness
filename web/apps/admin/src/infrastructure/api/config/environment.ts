type Environment = "development" | "staging" | "production";

class Setup {
  private static _environment: Environment = "development";

  private static apiBaseUrls: Record<Environment, string> = {
    development: "http://localhost:8080",
    staging: "https://api-staging.radiancewellness.com",
    production: "https://api.radiancewellness.com",
  };

  static initialize(env?: Environment): void {
    this._environment =
      env ||
      (process.env.NEXT_PUBLIC_ENVIRONMENT as Environment) ||
      "development";

    console.log(`Radiance Admin initialized — env: ${this._environment}`);
    console.log(`API Base URL: ${this.apiUrl}`);
  }

  static get environment(): Environment {
    return this._environment;
  }

  static get apiUrl(): string {
    return (
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      this.apiBaseUrls[this._environment]
    );
  }

  static get isDevelopment(): boolean {
    return this._environment === "development";
  }
}

// Auto-initialize on import
Setup.initialize();

export { Setup };
export type { Environment };

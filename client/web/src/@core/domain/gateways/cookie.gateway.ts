export namespace AbstractCookieGateway {
  export abstract class RefreshCookieGateway {
    abstract makeRefreshCookie(input: string): string;
  }
}

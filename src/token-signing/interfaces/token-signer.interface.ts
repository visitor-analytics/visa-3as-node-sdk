export interface TokenSigner {
  sign(
    payload: string,
    options: {
      kid: string;
    }
  ): string;
}

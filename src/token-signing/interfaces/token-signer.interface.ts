export interface TokenSigner {
  sign(
    payload: object,
    options: {
      header: {
        kid: string;
      };
    }
  ): string;
}

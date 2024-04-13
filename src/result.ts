export type Result<T = unknown, E = unknown> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

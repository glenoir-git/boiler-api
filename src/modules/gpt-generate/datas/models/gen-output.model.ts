export interface GenOutput<T> {
  result: T;
  inputTokens: number;
  outputTokens: number;
  totalAmount: number;
}
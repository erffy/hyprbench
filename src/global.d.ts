import Emitter from '@smootie/emitter';

declare module 'hyprbench' {
  export default class Benchmark extends Emitter<EventMap> {
    public constructor();

    /**
     * Benchmark list.
     */
    public readonly tests: Map<string, Function>;

    /**
     * Add test to benchmark.
     * @param name Name of the test.
     * @param fn Function.
     */
    public set(name: string, fn: () => unknown): void;
    /**
     * Run benchmark.
     * @param iterators Loop count.
     * @default 1000
     */
    public run(iterators?: number): BenchmarkResult[];
  }

  export interface BenchmarkResult extends _BenchmarkResult {}

  export interface EventMap {
    cyclone: (result: BenchmarkResult) => unknown;
    complete: (results: BenchmarkResult[]) => unknown;
  }
}

export interface _BenchmarkResult {
  /**
   * Name of the Tested.
   */
  name: string;

  /**
   * Operations Per Second.
   */
  ops: number;

  /**
   * Percentage of performance.
   */
  performance: string;

  /**
   * The elapsed time in milliseconds.     
   */
  time: number;
}
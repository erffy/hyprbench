import Emitter from '@smootie/emitter';

export default class Benchmark extends Emitter {
  constructor() {
    super();

    /**
     * @type Map<string, Function>
     * @readonly
     */
    this.tests = new Map();
  };

  /**
   * Add test.
   * @param {string} name 
   * @param {Function} fn 
   * @returns {void}
   */
  set(name, fn) {
    if (typeof name !== 'string') throw new TypeError(`'${name}' is not String.`);
    if (typeof fn !== 'function') throw new TypeError(`'${fn}' is not Function.`);

    this.tests.set(name, fn);

    return this;
  };

  /**
   * Run benchmark.
   * @param {number} iterations 
   * @returns {Array<import('../global')._BenchmarkResult>}
   */
  run(iterations = 1000) {
    if (typeof iterations !== 'number') throw new TypeError(`'${iterations}' is not Number.`);

    let results = [];

    for (const [name, fncallback] of this.tests) {      
      const startTime = performance.now();
      for (let index = 0; index < iterations; index++) fncallback();
      const endTime = performance.now();

      const time = endTime - startTime;
      const ops = iterations / (time / 1000);

      const perform = ((ops / iterations) * 100).toFixed(2);

      const data = { name, time, ops, performance: perform };

      this.emit('cyclone', data);

      results.push(data);
    };

    results = results.sort((a, b) => a.time - b.time);

    this.emit('complete', results);

    return results;
  };
};
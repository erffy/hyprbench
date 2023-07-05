const Emitter = require('@smootie/emitter');

module.exports = class Benchmark extends Emitter {
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
      const startTime = process.hrtime.bigint();
      for (let index = 0; index < iterations; index++) fncallback();
      const endTime = process.hrtime.bigint();

      const time = Number(endTime - startTime) / 1e6;
      const ops = iterations / (time / 1000);

      const performance = ((ops / iterations) * 100).toFixed(2);

      const data = { name, time, ops, performance };

      this.emit('cyclone', data);

      results.push(data);
    };

    results = results.sort((a, b) => b.time - a.time);

    this.emit('complete', results);

    return results;
  };
};
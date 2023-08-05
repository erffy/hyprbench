# No Longer Maintained.

# Hyprbench

- Lightweight and basic benchmark module.

## Installation

- We are recommend to use [`pnpm`](https://npmjs.com/pnpm).

```bash
pnpm install hyprbench
```

## Usage

```js
// ESM
import Benchmark from 'hyprbench';

// CJS
const Benchmark = require('hyprbench'); // or require('hyprbench/cjs')

const benchmark = new Benchmark();

benchmark.on('cyclone', (data) => console.log(data));
benchmark.on('complete', (data) => console.log(data));

benchmark.set('test', () => console.log('hyprbench'));

benchmark.run(1000); // Runs 1000 times. (default)
```

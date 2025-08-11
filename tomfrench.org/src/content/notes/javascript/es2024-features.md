---
title: JavaScript ES2024 Features
date: 2025-01-12
tags: [javascript, es2024, features]
---

# JavaScript ES2024 Features

## Object.groupBy()

A new static method that groups array elements by a given function:

```javascript
const inventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 5 },
  { name: 'bananas', type: 'fruit', quantity: 0 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 5 },
];

const result = Object.groupBy(inventory, ({ type }) => type);
// {
//   vegetables: [{ name: 'asparagus', type: 'vegetables', quantity: 5 }],
//   fruit: [{ name: 'bananas', type: 'fruit', quantity: 0 }, ...],
//   meat: [{ name: 'goat', type: 'meat', quantity: 23 }]
// }
```

## Array.prototype.toSorted()

Returns a new sorted array without mutating the original:

```javascript
const numbers = [3, 1, 4, 1, 5];
const sorted = numbers.toSorted(); // [1, 1, 3, 4, 5]
console.log(numbers); // [3, 1, 4, 1, 5] - unchanged
```

## Promise.withResolvers()

Provides a more convenient way to create promises with external resolution:

```javascript
const { promise, resolve, reject } = Promise.withResolvers();

// Later in your code
resolve('success');
```

## Temporal API (Stage 3)

While not in ES2024 yet, the Temporal API is making progress for better date/time handling:

```javascript
// Future syntax
const now = Temporal.Now.plainDateTimeISO();
const future = now.add({ days: 30 });
```

---
title: CSS Container Queries
date: 2025-01-08
tags: [css, container-queries, responsive]
---

# CSS Container Queries

Container queries allow elements to respond to the size of their containing element rather than the viewport.

## Basic Syntax

```css
.container {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
```

## Container Types

- `size` - Query both width and height
- `inline-size` - Query only the inline dimension (width in horizontal writing modes)
- `block-size` - Query only the block dimension (height in horizontal writing modes)

## Use Cases

### Responsive Components

```css
.product-card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .product-card .image {
    width: 50%;
    float: left;
  }
  
  .product-card .content {
    width: 50%;
    float: right;
  }
}
```

### Card Layouts

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.card {
  container-type: inline-size;
}

@container (min-width: 350px) {
  .card .title {
    font-size: 1.5rem;
  }
}
```

## Browser Support

Container queries are supported in all modern browsers as of 2023. Use `@supports` for feature detection:

```css
@supports (container-type: inline-size) {
  /* Container query styles */
}
```

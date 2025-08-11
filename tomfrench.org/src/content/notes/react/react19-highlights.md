---
title: React 19 Highlights
date: 2025-01-10
tags: [react, react19, features]
---

# React 19 Highlights

## Actions

React 19 introduces Actions for handling form submissions and async operations:

```jsx
function MyForm() {
  async function updateName(formData) {
    const name = formData.get("name");
    await updateUser(name);
  }

  return (
    <form action={updateName}>
      <input name="name" />
      <button type="submit">Update</button>
    </form>
  );
}
```

## use() Hook

A new primitive for consuming promises and context:

```jsx
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map(comment => <Comment key={comment.id} comment={comment} />);
}
```

## React Compiler

The React Compiler automatically optimizes components:

- Automatic memoization
- Reduces need for useMemo/useCallback
- Better performance by default

## Document Metadata

Built-in support for document metadata:

```jsx
function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="author" content={post.author} />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

## Ref as Prop

Refs can now be passed as regular props:

```jsx
function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// No more forwardRef needed!
```

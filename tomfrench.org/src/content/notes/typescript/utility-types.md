---
title: TypeScript Utility Types
date: 2025-01-05
tags: [typescript, utility-types, advanced]
---

# TypeScript Utility Types

A quick reference for TypeScript's built-in utility types.

## Partial\<T\>

Makes all properties optional:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }
```

## Required\<T\>

Makes all properties required:

```typescript
interface Config {
  theme?: string;
  debug?: boolean;
}

type RequiredConfig = Required<Config>;
// { theme: string; debug: boolean; }
```

## Pick\<T, K\>

Select specific properties:

```typescript
type UserSummary = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }
```

## Omit\<T, K\>

Exclude specific properties:

```typescript
type CreateUser = Omit<User, 'id'>;
// { name: string; email: string; }
```

## Record\<K, T\>

Create an object type with specific keys:

```typescript
type Roles = Record<'admin' | 'user' | 'guest', Permission[]>;
// { admin: Permission[]; user: Permission[]; guest: Permission[]; }
```

## Exclude\<T, U\> & Extract\<T, U\>

Filter union types:

```typescript
type Status = 'pending' | 'approved' | 'rejected';
type ActiveStatus = Exclude<Status, 'rejected'>;
// 'pending' | 'approved'

type CompletedStatus = Extract<Status, 'approved' | 'rejected'>;
// 'approved' | 'rejected'
```

## ReturnType\<T\>

Extract function return type:

```typescript
function getUser() {
  return { id: 1, name: 'John' };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; }
```

## Parameters\<T\>

Extract function parameter types:

```typescript
function updateUser(id: number, data: UserData) {}

type UpdateUserParams = Parameters<typeof updateUser>;
// [number, UserData]
```

---
title: Git Workflow Best Practices
date: 2025-01-03
tags: [git, workflow, best-practices]
---

# Git Workflow Best Practices

## Commit Message Conventions

Use conventional commits for clear history:

```
feat: add user authentication
fix: resolve memory leak in image processor
docs: update API documentation
style: format code with prettier
refactor: extract common utility functions
test: add unit tests for user service
```

## Branch Naming

Follow a consistent pattern:

```
feature/user-authentication
bugfix/memory-leak-fix
hotfix/critical-security-patch
release/v2.1.0
```

## Git Flow

1. **Main Branch**: Production-ready code
2. **Develop Branch**: Integration branch for features
3. **Feature Branches**: Individual features
4. **Release Branches**: Prepare for production release
5. **Hotfix Branches**: Critical fixes for production

## Useful Git Commands

### Rebase vs Merge

```bash
# Rebase feature branch onto main
git checkout feature-branch
git rebase main

# Interactive rebase to clean up commits
git rebase -i HEAD~3
```

### Stashing Changes

```bash
# Stash current changes
git stash

# Stash with message
git stash save "WIP: working on feature"

# Apply most recent stash
git stash pop

# List all stashes
git stash list
```

### Cherry-picking

```bash
# Apply specific commit to current branch
git cherry-pick <commit-hash>
```

## Pre-commit Hooks

Set up automated checks:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

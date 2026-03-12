---
title: git oneliners I keep everywhere
description: a handful of git aliases that follow me to every machine
pubDate: 2026-03-12
tags:
  - git
  - tooling
---

There's a class of git commands that are too long to type from memory but too
useful to look up every time. These are the ones I alias on every machine I
touch. Most of them are one line, all of them save me minutes I'd rather spend
on actual work.

## Check the world before a PR landed

```bash
git rev-parse $(gh pr view 14978 --json mergeCommit --jq '.mergeCommit.oid')~1
```

This gives you the commit hash right _before_ a specific PR's merge commit. I
reach for it when something breaks in main and I want to quickly verify whether
a particular PR introduced the regression. Checkout that hash, run your tests
or poke around, and you know immediately.

You could wrap it further to checkout directly:

```bash
git checkout $(git rev-parse $(gh pr view 14978 --json mergeCommit --jq '.mergeCommit.oid')~1)
```

Replace the PR number and you're standing in the repo exactly as it was before
that PR landed.

## The "oops" commit

```bash
git commit --amend --no-edit -a && git push --force-with-lease
```

I alias this as `goops`. We've all been there — you push a PR, immediately
notice a typo, a missing file, a stray `console.log`. This stages everything,
amends the previous commit without changing the message, and force-pushes safely.
`--force-with-lease` is the key detail: it refuses to push if the remote has
commits you haven't seen, so you won't accidentally blow away a colleague's work.

One command, one second, no extra "fix typo" commit cluttering your history.

## Branch ping-pong

```bash
git checkout -
```

With a checkout alias this becomes `gco -`. The dash works the same way as
`cd -` in your shell — it takes you back to the previous branch. When you're
bouncing between a feature branch and main, or reviewing a colleague's branch
and hopping back to yours, this is instant.

It also works with `git switch -` if you've moved to the newer command.

## A few more I'd recommend

**See what changed in a PR, fast:**

```bash
git diff main...HEAD --stat
```

Shows a compact summary of every file your branch has touched relative to main.
Great for a final sanity check before opening a PR.

**Undo the last commit but keep the changes:**

```bash
git reset --soft HEAD~1
```

I alias this as `gundo`. Useful when you've committed too early or want to
restructure your changes. The files stay staged, nothing is lost.

**Find the commit that broke something:**

```bash
git bisect start HEAD <known-good-commit> -- && git bisect run <test-command>
```

Automated binary search through your history. Give it a good commit, a bad
commit, and a command that exits 0 on success. Git does the rest. I don't alias
this one — I use it rarely enough that typing it out is a useful reminder of
how it works.

**Word-level diffs:**

```bash
git diff --color-words
git diff --cached --color-words
```

I alias these as `gd` and `gdc`. Standard `git diff` shows entire changed lines,
which is noisy when you've only tweaked a variable name or fixed a typo.
`--color-words` highlights just the words that changed, inline. The `--cached`
variant does the same for staged changes. Once you see diffs this way, the
default feels broken.

**Clean up merged branches:**

```bash
git branch --merged $(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@') | grep -v '^\s*\(master\|main\)$' | xargs git branch -d
```

Deletes every local branch that's already been merged into your default branch.
The `symbolic-ref` bit detects whether your remote uses `main` or `master` (or
anything else), so this works across repos without hardcoding. I run this about
once a week to keep `git branch` readable.

If you have any you can't live without, ones you rush to add whenever you're setting up
a fresh developer rig, then please share them with me! An email, message online or even a GitHub issue will work!

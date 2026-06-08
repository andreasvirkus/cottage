---
title: instant ui updates done right
description: what this shindig consists of
pubDate: 2026-06-08
tags:
  - learning
  - javascript
---

You know that annoying flicker where you click a like button, the count jumps up, then snaps back to the "real" value while the server catches up? That's the optimistic update anti-pattern biting you: and it's surprisingly tricky to get right.

Here's two React hooks that tackle this nicely together: `useActionState` for reliable async state handling and `useOptimistic` for instant UI feedback. Let's wire up a like button that batches server requests and stays in sync without the count ever jumping backwards. Towards the end, I'll also recommend a few more established libraries that take care of this, but I feel it's worth knowing how they usually act behind the scenes.

## the form action

We hook into a React form's `action` prop to trigger our like flow:

```tsx
<form className='mt-6' action={queueLikeAction}>
  <button type="submit" .../>
</form>
```

With a form action, you usually don't need `startTransition` for `useActionState`. In our case though, we also trigger the action from a `useEffect`, so we still wrap it there.

## queueLikeAction()

This function applies the optimistic update immediately and queues the like for batched server sync. It uses `addOptimisticLike` — the updater function returned by `useOptimistic`:

```tsx
const [optimisticState, addOptimisticLike] = useOptimistic(
  likeState,
  (currentState, likeIncrement: number) => ({
    ...
  }),
);
```

It also calls `flushBatch()`, which sends queued likes in controlled batches. More on that in a moment.

## the useEffect

This effect runs whenever `isPending` changes — meaning a server request has settled:

```tsx
useEffect(() => {
  if (!isPending && processingRef.current) {
    ...
    flushBatch();
  }
}, [flushBatch, isPending]);
```

Its job is to finalise the finished batch, reset state, and kick off `flushBatch()` for any likes that came in while we were waiting.

## flushBatch() and useOptimistic

The core of it: this function sends all queued likes in a single request while keeping the UI feeling instant. It calls `runLikeAction`, the dispatcher from `useActionState`:

```tsx
const flushBatch = useCallback(() => {
  ...
  startTransition(() => {
    runLikeAction({
      ...
    });
  });
}, [runLikeAction]);
```

A note on the `useCallback` here: it keeps the function reference stable, but if you're using the React Compiler, manual memoisation is often unnecessary and you can drop it.

## useActionState

This hook gives us confirmed state, an action dispatcher, and pending status all in one:

```tsx
const [likeState, runLikeAction, isPending] = useActionState(likeAction, initialState)
```

It uses `likeAction()` to process each batch update and return the next confirmed state.

## likeAction()

The server-side piece. It receives the batched payload, talks to the server, handles abort/error cases gracefully, and returns the next confirmed state:

```tsx
async function likeAction(previousState: LikeState, payload: LikePayload) {
  if (payload.type === 'LIKE_BATCH') {
    ...
  }
  return previousState;
}
```

---

If you've ever wanted your UI to feel instant without any weird count jumps while syncing with the server, this pattern is a solid starting point. The key insight is letting `useOptimistic` own the _perceived_ state while `useActionState` owns the _confirmed_ state — and `flushBatch` bridges the two without the user ever noticing the gap.

## going further

While the pattern above is a solid DIY approach, it's worth knowing what the established options look like if you'd rather not maintain the batching logic yourself.

- [TanStack Query](https://tanstack.com/query/) is the most direct swap. Its `onMutate`/`onError`/`onSettled` lifecycle maps almost 1:1 to what `useActionState` + `useOptimistic` is doing here - optimistic update on mutate, rollback on error, confirmed state on settle.
- [Zero](https://zero.rocicorp.dev/) sits at a different level entirely. Rather than patching over the request/response gap with optimistic updates, it syncs a local replica of your Postgres data to the client via their zero-cache layer. Reads and writes happen locally and sync in the background — so the like count is always instant not because you're predicting the server's answer, but because you are the server, locally. But the tradeoff is infrastructure: you're adding zero-cache to your stack rather than just reaching for a hook. If you're building something where instant UI across all interactions (not just likes) is a core requirement, it's worth considering from early on. Their Gigabugs demo with 1.2 million rows is a great stress test of the idea.

For a standalone like button, `useActionState` + `useOptimistic` is often all you need. But if you find yourself reaching for this pattern in five different places (or already love/use TanStack), that's usually the sign it's time to pick a library.

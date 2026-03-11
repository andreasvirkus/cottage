---
title: robust queued UI updates in react

description: useActionState and useOptimistic
pubDate: 2026-09-03
draft: true
tags:
  - javascript
  - learning
  - react
---

<!-- instant UI updates with useActionState and useOptimistic -->

You know that annoying flicker where you click a like button, the count jumps up, then snaps back to the "real" value while the server catches up? That's the optimistic update anti-pattern biting you — and it's tricky to get right.
Two React hooks tackle this nicely together: `useActionState` for reliable async state handling and `useOptimistic` for instant UI feedback. Let's wire up a like button that batches server requests and stays in sync without the count ever jumping backwards.

## the form action

We hook into a React form's action prop to trigger our like flow:

```tsx
<form className='mt-6' action={queueLikeAction}>
  <button type="submit" .../>
</form>
```

With a form action, you usually don't need startTransition for useActionState. In our case though, we also trigger the action from a useEffect, so we still wrap it there.
queueLikeAction()

This function applies the optimistic update immediately and queues the like for batched server sync. It uses addOptimisticLike — the updater function returned by useOptimistic:

```tsx
const [optimisticState, addOptimisticLike] = useOptimistic(
  likeState,
  (currentState, likeIncrement: number) => ({
    ...
  }),
)
```

It also calls flushBatch(), which sends queued likes in controlled batches. More on that in a moment.
the useEffect
This effect runs whenever isPending changes — meaning a server request has settled:

```tsx
useEffect(() => {
  if (!isPending && processingRef.current) {
    ...
    flushBatch();
  }
}, [flushBatch, isPending]);
```

Its job is to finalise the finished batch, reset state, and kick off flushBatch() for any likes that came in while we were waiting.
flushBatch() and useOptimistic
The core of it. This function sends all queued likes in a single request while keeping the UI feeling instant. It calls runLikeAction — the dispatcher from useActionState:

```tsx
const flushBatch = useCallback(() => {
  ...
  startTransition(() => {
    runLikeAction({
      ...
    })
  })
}, [runLikeAction])
```

A note on the useCallback here: it keeps the function reference stable, but if you're using the React Compiler, manual memoisation is often unnecessary and you can drop it.
useActionState
This hook gives us confirmed state, an action dispatcher, and pending status all in one:

```tsx
const [likeState, runLikeAction, isPending] = useActionState(likeAction, initialState)
```

It uses likeAction() to process each batch update and return the next confirmed state.
likeAction()
The server-side piece. It receives the batched payload, talks to the server, handles abort/error cases gracefully, and returns the next confirmed state:

```tsx
async function likeAction(previousState: LikeState, payload: LikePayload) {
  if (payload.type === 'LIKE_BATCH') {
    ...
  }
  return previousState;
}
```

If you've ever wanted your UI to feel instant without any weird count jumps while syncing with the server, this pattern is a solid starting point. The key insight is letting useOptimistic own the perceived state while useActionState owns the confirmed state — and flushBatch bridges the two without the user ever noticing the gap.
Thanks for giving this a read! 🖖

A few things I leaned into based on your other posts: leading with the problem rather than the solution, keeping the section intros short and letting the code carry the weight, and a conversational aside for the useCallback note rather than a heavy callout box. Let me know if you want to adjust the tone, length, or lean more into any particular section. Sonnet 4.6Claude is AI and can make mistakes. Please double-check responses.

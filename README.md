# React Hook: Use Scroll Progress

Keep track of your element scroll progress.

## Install

```bash
npm install --save react-use-scroll-progress
```

## Getting Started

Make sure the element your tracking has height set and overflow-y set to 'scroll'.
These two are required to receive scroll events which this hook is relaying on.

### Use reference to track DOM scroll progress

```js
import { useRef } from "react";
import { useScrollRef, getProgress } from "react-use-scroll-progress";

function MyComponent(props) {
  const ref = useRef(null);
  const state = useScrollRef(ref);

  console.log(state, getProgress(state));

  return (
    <div ref={ref} style={{ height: "300px", overflowY: "scroll" }}>
      Lorem p...
    </div>
  )
}

```

### Use query selector to track DOM scroll progress

```js
import { useEffect, useState } from "react";
import { useScrollElement, getProgress } from "react-use-scroll-progress";

function MyComponent(props) {
  const [dom, setDom] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const node = document.querySelector("#feed") as HTMLElement | null;
    if (node) {
      setDom(node);
    }
  }, []);

  const state = useScrollElement(dom);
  console.log(state, getProgress(state));

  return (
    <div id="feed" style={{ height: "300px", overflowY: "scroll" }}>
      Lorem p...
    </div>
  )
}

```

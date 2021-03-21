# React Hook: Use Scroll Progress

Keep track of your element scroll progress.

## Install

```bash
npm install --save react-use-scroll-progress
```

## Getting Started

```js
import { useScrollProgress } from "react-use-scroll-progress";

function MyComponent(props) {
  const ref = useRef(null);
  const { progress } = useScrollProgress(ref);

  console.log(progress);

  return (
    <div ref={ref} style={{ height: "300px", overflowY: "scroll" }}>
      Lorem p...
    </div>
  )
}

```

import * as React from 'react';

export function useScrollElement(htmlElm: HTMLElement | null) {
  const [state, setState] = React.useState({ current: 0, total: 0 });
  const scrollHandler = (event: Event) => {
    const elm = event.target as HTMLElement;
    const total = elm.scrollHeight - elm.offsetHeight;
    const current = elm.scrollTop;
    setState({ total, current });
  };
  React.useEffect(() => {
    if (htmlElm == null) {
      return;
    }
    htmlElm.addEventListener('scroll', scrollHandler);
    return () => htmlElm.removeEventListener('scroll', scrollHandler);
  }, [htmlElm]);
  return state;
}

type ScrollProgress = ReturnType<typeof useScrollElement>;

export function getProgress(scrollProgress: ScrollProgress) {
  const { current, total } = scrollProgress;
  if (total === 0) {
    return 0;
  }
  return (100 * current) / total;
}

export function useScrollRef(ref: React.MutableRefObject<any>): ScrollProgress {
  const [dom, setDom] = React.useState(null);
  React.useEffect(() => {
    if (ref && ref.current) {
      setDom(ref.current);
    }
  }, [ref]);

  const scrollProgress = useScrollElement(dom);
  return scrollProgress;
}

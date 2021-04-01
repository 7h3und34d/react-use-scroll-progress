import * as React from 'react';

export function useScrollProgress(ref: React.MutableRefObject<any>) {
  const [progress, setProgress] = React.useState<number>(0);

  const scrollHandler = (event: React.SyntheticEvent) => {
    const elm = event.target as HTMLElement;
    const total = elm.scrollHeight - elm.offsetHeight;
    const current = elm.scrollTop;
    setProgress(Math.floor((100 * current) / total));
  };
  React.useEffect(() => {
    const elm = ref.current;
    if (!elm) {
      return;
    }
    elm.addEventListener('scroll', scrollHandler);
    return () => elm.removeEventListener('scroll', scrollHandler);
  }, [ref]);

  return { progress };
}

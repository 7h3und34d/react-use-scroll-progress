import * as React from 'react';
import { useScrollProgress } from '../src';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

function MyComponent() {
  const ref = React.useRef(null);
  const { progress } = useScrollProgress(ref);

  return (
    <>
      <div role="article">{progress}</div>
      <div
        role="feed"
        ref={ref}
        style={{ height: '200px', overflowY: 'scroll' }}
      >
        {Array(20)
          .fill(0)
          .map((_, index) => {
            return <h2 key={index}>Hello world</h2>;
          })}
      </div>
    </>
  );
}

describe('use scroll progress', () => {
  it('on scroll progress is updated', () => {
    const [height, scrollTop] = [100, 23];
    render(<MyComponent />);

    jest
      .spyOn(screen.getByRole('feed'), 'scrollHeight', 'get')
      .mockImplementation(() => height);
    jest
      .spyOn(screen.getByRole('feed'), 'scrollTop', 'get')
      .mockImplementation(() => scrollTop);

    expect(screen.getByRole('article')).toHaveTextContent('0');
    fireEvent.scroll(screen.getByRole('feed'));
    expect(screen.getByRole('article')).toHaveTextContent(
      `${(100 * scrollTop) / height}`
    );
  });
});

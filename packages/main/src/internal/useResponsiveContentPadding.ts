import { getCurrentRange } from '@ui5/webcomponents-react-base/dist/Device';
import { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    Phone: { paddingLeft: '1rem', paddingRight: '1rem' },
    Tablet: { paddingLeft: '2rem', paddingRight: '2rem' },
    Desktop: { paddingLeft: '2rem', paddingRight: '2rem' },
    LargeDesktop: { paddingLeft: '3rem', paddingRight: '3rem' }
  },
  { name: 'StdExtPadding' }
);

export const useResponsiveContentPadding = (element) => {
  const [currentRange, setCurrentRange] = useState(getCurrentRange('StdExt', window.innerWidth).name);
  let resizeTimeout = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    const observer = new ResizeObserver(([el]) => {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize = Array.isArray(el.contentBoxSize) ? el.contentBoxSize[0] : el.contentBoxSize;
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        setCurrentRange(() => getCurrentRange('StdExt', contentBoxSize.inlineSize).name);
      }, 150);
    });
    if (element) {
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
    };
  }, [element]);

  return classes[currentRange];
};

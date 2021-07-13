import { useEffect, useState } from 'react';

declare const ResizeObserver;

export const useObserveHeights = (objectPage, topHeader, headerContentRef, anchorBarRef, { noHeader }) => {
  const [topHeaderHeight, setTopHeaderHeight] = useState(0);
  const [headerContentHeight, setHeaderContentHeight] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(true);
  useEffect(() => {
    const headerIntersectionObserver = new IntersectionObserver(
      ([header]) => {
        if (header.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
          setHeaderContentHeight(0);
        }
      },
      { rootMargin: `-${topHeaderHeight}px 0px 0px 0px`, root: objectPage?.current, threshold: 0.3 }
    );

    if (headerContentRef?.current) {
      headerIntersectionObserver.observe(headerContentRef.current);
    }

    return () => {
      headerIntersectionObserver.disconnect();
    };
  }, [topHeaderHeight, setHeaderContentHeight, headerContentRef.current, setIsIntersecting]);

  // top header
  useEffect(() => {
    const headerContentResizeObserver = new ResizeObserver(([header]) => {
      // Firefox implements `borderBoxSize` as a single content rect, rather than an array
      const borderBoxSize = Array.isArray(header.borderBoxSize) ? header.borderBoxSize[0] : header.borderBoxSize;
      // Safari doesn't implement `borderBoxSize`
      setTopHeaderHeight(borderBoxSize?.blockSize ?? header.target.getBoundingClientRect().height);
    });
    if (topHeader?.current) {
      headerContentResizeObserver.observe(topHeader.current);
    }
    return () => {
      headerContentResizeObserver.disconnect();
    };
  }, [topHeader?.current, setTopHeaderHeight]);

  // header content
  useEffect(() => {
    const headerContentResizeObserver = new ResizeObserver(([headerContent]) => {
      if (isIntersecting) {
        // Firefox implements `borderBoxSize` as a single content rect, rather than an array
        const borderBoxSize = Array.isArray(headerContent.borderBoxSize)
          ? headerContent.borderBoxSize[0]
          : headerContent.borderBoxSize;
        // Safari doesn't implement `borderBoxSize`
        setHeaderContentHeight(borderBoxSize?.blockSize ?? headerContent.target.getBoundingClientRect().height);
      }
    });

    if (headerContentRef?.current) {
      headerContentResizeObserver.observe(headerContentRef.current);
    }
    return () => {
      headerContentResizeObserver.disconnect();
    };
  }, [headerContentRef?.current, setHeaderContentHeight, isIntersecting]);
  const anchorBarHeight = anchorBarRef?.current?.offsetHeight ?? 33;
  const totalHeaderHeight = (noHeader ? 0 : topHeaderHeight + headerContentHeight) + anchorBarHeight;

  return { topHeaderHeight, headerContentHeight, anchorBarHeight, totalHeaderHeight };
};

import { CarouselArrowsPlacement } from '@ui5/webcomponents-react/dist/CarouselArrowsPlacement';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/Carousel';

export interface CarouselPropTypes extends CommonProps {
  /**
   * Defines the position of arrows.
   *
   * Available options are:
   *
   * *   `Content`
   * *   `Navigation`
   *
   *
   * When set to "Content", the arrows are placed on the sides of the current page.
   * When set to "Navigation", the arrows are placed on the sides of the page indicator.
   */
  arrowsPlacement?: CarouselArrowsPlacement;
  /**
   * Defines whether the carousel should loop, i.e show the first page after the last page is reached and vice versa.
   */
  cyclic?: boolean;
  /**
   * If set to true the navigation is hidden.
   */
  hideNavigation?: boolean;
  /**
   * Defines when the `load-more` event is fired. If not applied the event will not be fired.
   */
  infiniteScrollOffset?: number;
  /**
   * Sets the number of items per page on large size (more than 1024px). One item per page shown by default.
   */
  itemsPerPageL?: number;
  /**
   * Sets the number of items per page on medium size (from 640px to 1024px). One item per page shown by default.
   */
  itemsPerPageM?: number;
  /**
   * Sets the number of items per page on small size (up to 640px). One item per page shown by default.
   */
  itemsPerPageS?: number;
  /**
   * Defines the index of the initially selected item.
   */
  selectedIndex?: number;
  /**
   * Defines the content of the `Carousel`.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired for the last items of the `Carousel` if it is scrolled and the direction of scrolling is to the end. The number of items for which the event is fired is controlled by the `infiniteScrollOffset` property.
   */
  onLoadMore?: (event: Ui5CustomEvent<HTMLElement>) => void;
  /**
   * Fired whenever the `selectedIndex` changes due to user interaction, when the user clicks on the navigation arrows or while resizing, based on the `items-per-page-l`, `items-per-page-m` and `items-per-page-s` properties.
   */
  onNavigate?: (event: Ui5CustomEvent<HTMLElement, { selectedIndex: number }>) => void;
}

/**
 * The carousel allows the user to browse through a set of items by swiping right or left. The component is mostly used for showing a gallery of images, but can hold any other HTML element.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Carousel" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Carousel = withWebComponent<CarouselPropTypes>(
  'ui5-carousel',
  ['arrowsPlacement', 'infiniteScrollOffset', 'itemsPerPageL', 'itemsPerPageM', 'itemsPerPageS', 'selectedIndex'],
  ['cyclic', 'hideNavigation'],
  [],
  ['load-more', 'navigate']
);

Carousel.displayName = 'Carousel';

Carousel.defaultProps = {
  arrowsPlacement: CarouselArrowsPlacement.Content,
  cyclic: false,
  hideNavigation: false,
  infiniteScrollOffset: 1,
  itemsPerPageL: 1,
  itemsPerPageM: 1,
  itemsPerPageS: 1,
  selectedIndex: 0
};

export { Carousel };

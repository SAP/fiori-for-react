import { getEffectiveScopingSuffixForTag } from '@ui5/webcomponents-base/dist/CustomElementsScope';
import { useConsolidatedRef } from '@ui5/webcomponents-react-base/dist/useConsolidatedRef';
import React, {
  Children,
  cloneElement,
  ComponentType,
  forwardRef,
  ReactElement,
  RefObject,
  useEffect,
  useRef
} from 'react';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5DomRef } from '@ui5/webcomponents-react/interfaces/Ui5DomRef';

const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const camelToKebabCase = (s: string) => s.replace(/([A-Z])/g, (a, b: string) => `-${b.toLowerCase()}`);
const kebabToCamelCase = (str: string) => str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());

const createEventPropName = (eventName) => `on${capitalizeFirstLetter(kebabToCamelCase(eventName))}`;

type EventHandler = (event: CustomEvent<unknown>) => void;

export const withWebComponent = <Props extends Record<string, any>, RefType = Ui5DomRef>(
  tagName: string,
  regularProperties: string[],
  booleanProperties: string[],
  slotProperties: string[],
  eventProperties: string[]
) => {
  const WithWebComponent = forwardRef((props: Props & CommonProps, wcRef: RefObject<RefType>) => {
    const { className, tooltip, children, ...rest } = props;

    const ref = useConsolidatedRef<HTMLElement>(wcRef);
    const eventRegistry = useRef<Record<string, EventHandler>>({});

    // regular props (no booleans, no slots and no events)
    const regularProps = regularProperties.reduce((acc, name) => {
      if (rest.hasOwnProperty(name)) {
        return { ...acc, [camelToKebabCase(name)]: rest[name] };
      }
      return acc;
    }, {});

    // boolean properties - only attach if they are truthy
    const booleanProps = booleanProperties.reduce((acc, name) => {
      if (rest[name] === true || rest[name] === 'true') {
        return { ...acc, [camelToKebabCase(name)]: true };
      }
      return acc;
    }, {});

    const slots = slotProperties.reduce((acc, name) => {
      const slotValue = rest[name] as ReactElement;

      if (!slotValue) return acc;

      const slottedChildren = [];
      let index = 0;
      const removeFragments = (element) => {
        if (!element) return;
        if (element.type === React.Fragment) {
          Children.toArray(element.props?.children)
            .filter(Boolean)
            .forEach((item) => {
              removeFragments(item);
            });
        } else {
          slottedChildren.push(
            cloneElement(element, {
              key: `${name}-${index}`,
              slot: name
            })
          );
          index++;
        }
      };

      if (Array.isArray(slotValue)) {
        slotValue.forEach((item) => {
          removeFragments(item);
        });
      } else {
        removeFragments(slotValue);
      }
      return [...acc, ...slottedChildren];
    }, []);
    // event binding
    useEffect(
      () => {
        eventProperties.forEach((eventName) => {
          const eventHandler = rest[createEventPropName(eventName)] as EventHandler;
          if (typeof eventHandler === 'function') {
            eventRegistry.current[eventName] = eventHandler;
            ref.current.addEventListener(eventName, eventRegistry.current[eventName]);
          }
        });

        return () => {
          // eslint-disable-next-line guard-for-in
          for (const eventName in eventRegistry.current) {
            ref.current?.removeEventListener(eventName, eventRegistry.current[eventName]);
          }
        };
      },
      eventProperties.map((eventName) => rest[createEventPropName(eventName)])
    );

    // non web component related props, just pass them
    const nonWebComponentRelatedProps = Object.entries(rest)
      .filter(([key]) => !regularProperties.includes(key))
      .filter(([key]) => !slotProperties.includes(key))
      .filter(([key]) => !booleanProperties.includes(key))
      .filter(([key]) => !eventProperties.map((eventName) => createEventPropName(eventName)).includes(key))
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

    const tagNameSuffix: string = getEffectiveScopingSuffixForTag(tagName);
    const Component = (tagNameSuffix ? `${tagName}-${tagNameSuffix}` : tagName) as unknown as ComponentType<
      CommonProps & { class: string }
    >;

    return (
      <Component
        ref={ref}
        {...booleanProps}
        {...regularProps}
        {...nonWebComponentRelatedProps}
        class={className}
        title={tooltip}
      >
        {slots}
        {children}
      </Component>
    );
  });

  WithWebComponent.displayName = `WithWebComponent(${tagName})`;

  return WithWebComponent;
};

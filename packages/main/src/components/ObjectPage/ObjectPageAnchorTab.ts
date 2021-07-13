/* eslint-disable no-underscore-dangle */
import ifDefined from '@ui5/webcomponents-base/dist/renderer/ifDefined.js';
import { html, setSuffix, setTags } from '@ui5/webcomponents-base/dist/renderer/LitRenderer.js';
import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import Icon from '@ui5/webcomponents/dist/Icon.js';
import Tab from '@ui5/webcomponents/dist/Tab.js';
import TabContainer from '@ui5/webcomponents/dist/TabContainer.js';
import { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from 'react';

interface ObjectPageAnchorTabPropTypes extends HTMLAttributes<HTMLElement> {
  text: string;
  'with-sub-sections'?: boolean;
  selected?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'ui5-object-page-anchor-tab': DetailedHTMLProps<ObjectPageAnchorTabPropTypes, HTMLElement>;
    }
  }
}

const metadata = {
  tag: 'ui5-object-page-anchor-tab',
  properties: {
    withSubSections: {
      type: Boolean
    }
  },
  events: {
    'show-sub-sections': {}
  }
};

class ObjectPageAnchorTab extends Tab {
  static get metadata() {
    return metadata;
  }

  static get dependencies() {
    return [Icon];
  }

  static get stripTemplate() {
    return (context, tags, suffix) => {
      setTags(tags);
      setSuffix(suffix);
      return html` <li
        id="${ifDefined(context._id)}"
        class="${ifDefined(context.headerClasses)}"
        tabindex="${ifDefined(context._tabIndex)}"
        role="tab"
        aria-posinset="${ifDefined(context._posinset)}"
        aria-setsize="${ifDefined(context._setsize)}"
        aria-controls="ui5-tc-contentItem-${ifDefined(context._posinset)}"
        aria-selected="${ifDefined(context.effectiveSelected)}"
        aria-disabled="${ifDefined(context.effectiveDisabled)}"
        ?disabled="${context.effectiveDisabled}"
        aria-labelledby="${ifDefined(context.ariaLabelledBy)}"
        data-ui5-stable="${ifDefined(context.stableDomRef)}"
        style="list-style-type: none;"
      >
        <div class="ui5-tab-strip-itemContent">
          ${context.text
            ? html`<span
                class="ui5-tab-strip-itemText"
                id="${ifDefined(context._id)}-text"
                ?data-active="${ifDefined(context.withSubSections)}"
              >
                ${ifDefined(context.text)}
              </span>`
            : undefined}
          ${context.withSubSections
            ? html`<ui5-icon
                name="slim-arrow-down"
                class="objectPageSubSectionsIcon"
                interactive
                @click="${context._handleOnSubSectionsClick}"
              />`
            : undefined}
        </div>
      </li>`;
    };
  }

  _handleOnSubSectionsClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.fireEvent('show-sub-sections', {
      targetRef: (e.target as any).parentElement.parentElement
    });
  };

  // maybe we can look into a custom overflow template as well
  // static get overflowTemplate() {
  //   return (context, tags, suffix) => {
  //     setTags(tags);
  //     setSuffix(suffix);
  //     return html`<ui5-li-custom
  //       id="${ifDefined(context._id)}"
  //       class="${ifDefined(context.overflowClasses)}"
  //       type="${ifDefined(context.overflowState)}"
  //       ?selected="${context.effectiveSelected}"
  //       ?disabled="${context.effectiveDisabled}"
  //       aria-disabled="${ifDefined(context.effectiveDisabled)}"
  //       aria-selected="${ifDefined(context.effectiveSelected)}"
  //       aria-labelledby="${ifDefined(context.ariaLabelledBy)}"
  //     >
  //       <div class="ui5-tab-overflow-itemContent">${ifDefined(context.text)}</div>
  //     </ui5-li-custom>`;
  //   };
  // }
}

TabContainer.registerTabStyles(`

.ui5-tab-strip-itemContent {
  display: flex;
  align-items: center;
  pointer-events: all;
}

.objectPageSubSectionsIcon {
  padding-left: 0.625rem;
}

.objectPageSubSectionsIcon[interactive]:hover {
  color: ${ThemingParameters.sapContent_IconColor};
}

.ui5-tab-strip-itemText[data-active]:hover {
  color: ${ThemingParameters.sapButton_Lite_Hover_TextColor};
}
`);
// TabContainer.registerStaticAreaTabStyles(overflowCss);

export { ObjectPageAnchorTab };

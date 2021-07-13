import '@ui5/webcomponents-icons/dist/navigation-down-arrow';
import { createUseStyles } from 'react-jss';
import { useI18nBundle } from '@ui5/webcomponents-react-base/dist/hooks';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/usePassThroughHtmlProps';
import { enrichEventWithDetails } from '@ui5/webcomponents-react-base/dist/Utils';
import { CANCEL, VARIANTS } from '@ui5/webcomponents-react/dist/assets/i18n/i18n-defaults';
import { Button } from '@ui5/webcomponents-react/dist/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/dist/ButtonDesign';
import { List } from '@ui5/webcomponents-react/dist/List';
import { ListItemTypes } from '@ui5/webcomponents-react/dist/ListItemTypes';
import { ListMode } from '@ui5/webcomponents-react/dist/ListMode';
import { PlacementType } from '@ui5/webcomponents-react/dist/PlacementType';
import { ResponsivePopover } from '@ui5/webcomponents-react/dist/ResponsivePopover';
import { StandardListItem } from '@ui5/webcomponents-react/dist/StandardListItem';
import { Title } from '@ui5/webcomponents-react/dist/Title';
import { TitleLevel } from '@ui5/webcomponents-react/dist/TitleLevel';
import React, { FC, forwardRef, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5ResponsivePopoverDomRef } from '@ui5/webcomponents-react/interfaces/Ui5ResponsivePopoverDomRef';
import { stopPropagation } from '../../internal/stopPropagation';

export interface VariantItem {
  key: string;
  label: string;
}

export interface VariantManagementPropTypes extends Omit<CommonProps, 'onSelect'> {
  /**
   * Determines on which side the VariantManagement popover is placed at.
   */
  placement?: PlacementType;
  /**
   * Describes the heading of the VariantManagement popover.
   *
   * __Note:__ If not set, the default heading is used.
   */
  heading?: string;
  /**
   * Selects the <code>variantItem</code> by its key.
   */
  selectedKey?: string;
  /**
   * Defines whether the VariantManagement should be closed if an item was selected.
   */
  closeOnItemSelect?: boolean;
  /**
   * Variant items displayed by the VariantManagement component.
   */
  variantItems: VariantItem[];
  /**
   * Describes the `HTML Headings` level of the variants.
   */
  level?: TitleLevel;
  /**
   * Defines whether the VariantManagement is disabled.
   */
  disabled?: boolean;
  /**
   * Fired after a variant has been selected.
   */
  onSelect?: (event: CustomEvent<{ item: HTMLElement; selectedItem: VariantItem }>) => void;
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer'
  },
  title: {
    cursor: 'pointer',
    color: ThemingParameters.sapButton_TextColor,
    '&:hover': {
      color: ThemingParameters.sapButton_Hover_TextColor
    }
  },
  disabled: {
    '& $title': {
      color: ThemingParameters.sapGroup_TitleTextColor,
      cursor: 'default',
      '&:hover': {
        color: 'ThemingParameters.sapGroup_TitleTextColor'
      }
    }
  },
  footer: {
    margin: '0.4375rem 1rem 0.4325rem auto'
  }
};

const useStyles = createUseStyles(styles, { name: 'VariantManagement' });

/**
 * The `VariantManagement` component can be used to manage variants, such as FilterBar variants or AnalyticalTable variants.
 */
const VariantManagement: FC<VariantManagementPropTypes> = forwardRef(
  (props: VariantManagementPropTypes, ref: Ref<HTMLDivElement>) => {
    const i18nBundle = useI18nBundle('@ui5/webcomponents-react');
    const {
      variantItems,
      heading = i18nBundle.getText(VARIANTS),
      className,
      style,
      tooltip,
      placement,
      level,
      onSelect,
      closeOnItemSelect,
      disabled
    } = props;

    const classes = useStyles();
    const popoverRef = useRef<Ui5ResponsivePopoverDomRef>(null);

    const [selectedKey, setSelectedKey] = useState(props.selectedKey ?? variantItems?.[0]?.key ?? null);

    useEffect(() => {
      if (props.selectedKey) {
        setSelectedKey(props.selectedKey);
      }
    }, [props.selectedKey, setSelectedKey]);

    const handleCancelButtonClick = useCallback(() => {
      popoverRef.current.close();
    }, [popoverRef]);

    const handleOpenVariantManagement = useCallback(
      (e) => {
        popoverRef.current.open(e.target);
      },
      [popoverRef]
    );

    const text = i18nBundle.getText(CANCEL);

    const footerButtons = useMemo(() => {
      return (
        <Button className={classes.footer} onClick={handleCancelButtonClick} design={ButtonDesign.Emphasized}>
          {text}
        </Button>
      );
    }, [classes.footer, handleCancelButtonClick, text]);

    const getItemByKey = (key) => {
      return variantItems?.find((item) => item.key === key);
    };

    const selectedItem = getItemByKey(selectedKey) || variantItems[0];

    const variantManagementClasses = StyleClassHelper.of(classes.container);

    if (disabled) {
      variantManagementClasses.put(classes.disabled);
    }

    if (className) {
      variantManagementClasses.put(className);
    }

    const handleVariantItemSelect = useCallback(
      (event) => {
        const newSelectedKey = event.detail.item.dataset.key;
        setSelectedKey(newSelectedKey);
        onSelect(
          enrichEventWithDetails(event, {
            ...event.details,
            selectedItem: getItemByKey(newSelectedKey) || variantItems[0]
          })
        );
        if (closeOnItemSelect) {
          handleCancelButtonClick();
        }
      },
      [handleCancelButtonClick, closeOnItemSelect, selectedKey, variantItems, setSelectedKey]
    );

    const passThroughProps = usePassThroughHtmlProps(props, ['onSelect']);

    if (!variantItems || variantItems.length < 1) {
      return null;
    }

    return (
      <div className={variantManagementClasses.valueOf()} style={style} title={tooltip} {...passThroughProps} ref={ref}>
        <Title level={level} className={classes.title}>
          {selectedItem.label}
        </Title>
        <Button
          onClick={handleOpenVariantManagement}
          design={ButtonDesign.Transparent}
          icon="navigation-down-arrow"
          disabled={disabled}
        />
        {createPortal(
          <ResponsivePopover
            ref={popoverRef}
            headerText={heading}
            placementType={placement}
            footer={footerButtons}
            onAfterClose={stopPropagation}
          >
            <List onItemClick={handleVariantItemSelect} mode={ListMode.SingleSelect}>
              {variantItems.map((item) => (
                <StandardListItem
                  style={{ width: '300px' }}
                  data-key={item.key}
                  type={ListItemTypes.Active}
                  key={item.key}
                  selected={selectedKey === item.key}
                >
                  {item.label}
                </StandardListItem>
              ))}
            </List>
          </ResponsivePopover>,
          document.body
        )}
      </div>
    );
  }
);

VariantManagement.defaultProps = {
  onSelect: () => {},
  closeOnItemSelect: true,
  placement: PlacementType.Bottom,
  level: TitleLevel.H4,
  disabled: false,
  variantItems: []
};
VariantManagement.displayName = 'VariantManagement';

export { VariantManagement };

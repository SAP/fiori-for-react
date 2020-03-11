import { StyleClassHelper } from '@ui5/webcomponents-react-base/lib/StyleClassHelper';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/lib/usePassThroughHtmlProps';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import React, {
  Children,
  cloneElement,
  CSSProperties,
  FC,
  forwardRef,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { createComponentStyles } from '@ui5/webcomponents-react-base/lib/createComponentStyles';
import { ClassProps } from '../../interfaces/ClassProps';
import { CommonProps } from '../../interfaces/CommonProps';
import { BusyIndicator } from '../../webComponents/BusyIndicator';
import styles from './FilterBar.jss';
import { FilterDialog } from './FilterDialog';
import { addRef, renderSearchWithValue, setPropsOfChildren } from './utils';
//add not supported warning for deprecated and not supported filter-items/elements
//todo visibleInFilterBar doesn't work anymore
//todo CheckBox doesn't work
//todo add deprecated filter-items to basic group
export interface FilterBarPropTypes extends CommonProps {
  renderVariants?: () => JSX.Element;
  renderSearch?: () => ReactElement;
  useToolbar?: boolean;
  filterBarExpanded?: boolean;
  children: ReactNode | ReactNodeArray;
  filterContainerWidth?: CSSProperties['width'];
  considerGroupName?: boolean;
  showClearOnFB?: boolean;
  showGoOnFB?: boolean;
  showFilterConfiguration?: boolean;
  showClearButton?: boolean;
  showRestoreButton?: boolean;
  showGo?: boolean;
  activeFiltersCount: number | string;
  loading: boolean;
  showSearchOnDialog?: boolean;

  //todo
  showRestoreOnFB?: boolean;
  handleDialogOpen?: () => {};
  handleDialogClose?: () => {};
  handleReset?: () => {};
  handleRestore?: () => {};
}

interface FilterBarInternalProps extends FilterBarPropTypes, ClassProps {}

const useStyles = createComponentStyles(styles, { name: 'FilterBar' });

/**
 * <code>import { FilterBar } from '@ui5/webcomponents-react/lib/FilterBar';</code>
 */
const FilterBar: FC<FilterBarPropTypes> = forwardRef((props: FilterBarPropTypes, ref: RefObject<HTMLDivElement>) => {
  const {
    children,
    renderVariants,
    renderSearch,
    useToolbar,
    loading,
    filterBarExpanded,
    considerGroupName,
    filterContainerWidth,
    activeFiltersCount,
    showClearOnFB,
    showGoOnFB,
    showGo,
    showFilterConfiguration,
    showRestoreOnFB,
    showClearButton,
    showRestoreButton,
    showSearchOnDialog
  } = props as FilterBarInternalProps;
  const [showFilters, setShowFilters] = useState(useToolbar ? filterBarExpanded : true);
  const [mountFilters, setMountFilters] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterRefs, setFilterRefs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef(null);

  const initChildrenWithRef = useCallback(() => {
    let filterRefs = [];
    const newChildren = Children.toArray(children)
      .filter(Boolean)
      .map((child) => {
        const childrenRef = (node) => {
          filterRefs.push({ node, key: child.key });
          return node;
        };
        const filterChildren = child.props.children;
        return cloneElement(child as ReactElement<any>, {
          children: {
            ...filterChildren,
            ref: childrenRef
          }
        });
      });
    setFilterRefs(filterRefs);
    return newChildren;
  }, [children, setFilterRefs]);

  const [childrenWithRef, setChildrenWithRef] = useState(initChildrenWithRef);

  useEffect(() => {
    setChildrenWithRef(initChildrenWithRef);
  }, [initChildrenWithRef, setChildrenWithRef]);

  const classes = useStyles();

  const handleHideFilterBar = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  const filterAreaClasses = StyleClassHelper.of(classes.filterArea);
  if (showFilters) {
    filterAreaClasses.put(classes.filterAreaOpen);
  } else {
    filterAreaClasses.put(classes.filterAreaClosed);
  }

  const handleDialogSave = (currentChildren, visibleChildren) => {
    //todo Event.of
    let childrenWithNewProps = setPropsOfChildren(currentChildren, 'dialogRef');
    if (visibleChildren) {
      childrenWithNewProps = handleToggleFilterVisible(visibleChildren, childrenWithNewProps);
    }
    setChildrenWithRef(childrenWithNewProps);
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    //todo Event.of
    setChildrenWithRef(setPropsOfChildren(addRef(childrenWithRef, filterRefs, 'filterBarRef'), 'filterBarRef'));
    setDialogOpen(true);
  };

  const handleDialogClose = useCallback(() => {
    //todo Event.of
    setDialogOpen(false);
  }, [setDialogOpen]);

  const handleClearFilters = useCallback(() => {
    //todo Event.of
  }, []);
  const handleToggleFilterVisible = useCallback((elements, children) => {
    //todo Event.of
    const newChildren = children.map((child) => {
      const currentChild = elements.filter((item) => item.element.key === child.key)[0];
      if (currentChild) {
        return cloneElement(child as ReactElement<any>, {
          visibleInFilterBar: currentChild.event.parameters.checked
        });
      }
      return child;
    });
    // setChildrenWithRef(newChildren);
    return newChildren;
  }, []);

  const handleGo = useCallback(() => {
    //todo Event.of
  }, []);

  const passThroughProps = usePassThroughHtmlProps(props);

  const renderChildren = useCallback(() => {
    let childProps = { considerGroupName: considerGroupName, inFB: true };
    return childrenWithRef.map((child) => {
      if (filterContainerWidth) {
        childProps.style = { width: filterContainerWidth, ...child.props.style };
      }
      return cloneElement(child as ReactElement<any>, childProps);
    });
  }, [filterContainerWidth, considerGroupName, childrenWithRef]);

  const handleSearchValueChange = useCallback(
    (newVal) => {
      setSearchValue(newVal);
    },
    [setSearchValue]
  );

  const handleRestoreFilters = useCallback(
    (source) => {
      //todo Event.of
      if (source === 'dialog' && showGo) {
        setDialogOpen(false);
        setDialogOpen(true);
      } else if (source === 'filterBar' && showGoOnFB) {
        setMountFilters(false);
        setMountFilters(true);
      }
    },
    [setDialogOpen, showGo, showGoOnFB]
  );

  const handleRestore = useCallback(() => {
    handleRestoreFilters('filterBar');
  }, [handleRestoreFilters]);

  return (
    <>
      {dialogOpen && showFilterConfiguration && (
        <FilterDialog
          open={dialogOpen}
          handleDialogClose={handleDialogClose}
          handleGo={handleGo}
          handleRestoreFilters={handleRestoreFilters}
          searchValue={searchRef.current?.children[0]._state.value}
          handleSearchValueChange={handleSearchValueChange}
          showClearButton={showClearButton}
          showRestoreButton={showRestoreButton}
          showSearch={showSearchOnDialog}
          renderFBSearch={renderSearch}
          handleToggleFilterVisible={handleToggleFilterVisible}
          handleClearFilters={handleClearFilters}
          handleDialogSave={handleDialogSave}
          showGoButton={showGo}
        >
          {childrenWithRef}
        </FilterDialog>
      )}
      <div ref={ref} className={classes.outerContainer} {...passThroughProps}>
        {loading ? (
          <BusyIndicator active className={classes.loadingContainer} />
        ) : (
          <>
            <div className={classes.filterBarHeader}>
              {renderVariants && renderVariants()}
              {renderSearch && (
                <div className={classes.vLine} ref={searchRef}>
                  {renderSearchWithValue(renderSearch, searchValue)}
                </div>
              )}
              {useToolbar && (
                <div className={classes.headerRowRight}>
                  {showClearOnFB && (
                    <Button onClick={handleClearFilters} design={ButtonDesign.Transparent}>
                      Clear
                    </Button>
                  )}
                  {showRestoreOnFB && (
                    <Button onClick={handleRestore} design={ButtonDesign.Transparent}>
                      Restore
                    </Button>
                  )}
                  <Button
                    onClick={handleHideFilterBar}
                    design={ButtonDesign.Transparent}
                    className={classes.showFiltersBtn}
                  >
                    {showFilters ? 'Hide Filter Bar' : 'Show Filter Bar'}
                  </Button>
                  {showFilterConfiguration && (
                    <Button onClick={handleDialogOpen}>
                      {`Filters${activeFiltersCount ? ` (${activeFiltersCount})` : ''}`}
                    </Button>
                  )}
                  {showGoOnFB && (
                    <Button onClick={handleGo} design={ButtonDesign.Emphasized}>
                      Go
                    </Button>
                  )}
                </div>
              )}
            </div>
            {mountFilters && <div className={filterAreaClasses.valueOf()}>{renderChildren()}</div>}
          </>
        )}
      </div>
    </>
  );
});

FilterBar.defaultProps = {
  useToolbar: true,
  filterBarExpanded: true,
  showClearOnFB: false,
  showGo: false,
  showRestoreOnFB: false,
  showGoOnFB: false,
  showFilterConfiguration: false,
  showClearButton: false,
  showRestoreButton: false,
  showDialogSearch: false,
  considerGroupName: false,
  loading: false
};

FilterBar.displayName = 'FilterBar';
export { FilterBar };

const PROP_INCLUDELIST = /^(aria-|data-|id$|on[A-Z]|slot$|title$)/;

export const usePassThroughHtmlProps = (props: Record<string, any>, propExcludeList: string[] = []) => {
  const componentPropExcludelist = new Set(propExcludeList);

  const returnVal: Record<string, unknown> = {};
  for (const name in props) {
    if (PROP_INCLUDELIST.test(name) && !componentPropExcludelist.has(name)) {
      returnVal[name] = props[name];
    }
  }

  return returnVal;
};

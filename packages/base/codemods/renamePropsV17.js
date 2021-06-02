const renamingMap = {
  AnalyticalTable: {
    title: 'header'
  }
};

module.exports = ({ path, source }, api, options) => {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || {};

  const root = j(source);

  // eslint-disable-next-line guard-for-in
  for (const componentName in renamingMap) {
    const jsxElements = root.find(j.JSXOpeningElement, { name: { name: componentName } });
    jsxElements.forEach((p) => {
      Object.entries(renamingMap[componentName]).forEach(([oldName, newName]) => {
        j(p)
          .find(j.JSXAttribute, { name: { name: oldName } })
          .find(j.JSXIdentifier)
          .replaceWith(newName);
      });
    });
  }

  return root.toSource(printOptions);
};

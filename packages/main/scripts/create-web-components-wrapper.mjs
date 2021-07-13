/* eslint-disable @typescript-eslint/no-var-requires */
import mainWebComponentsSpec from '@ui5/webcomponents/dist/api.json';
import fioriWebComponentsSpec from '@ui5/webcomponents-fiori/dist/api.json';
import dedent from 'dedent';
import prettier from 'prettier';
import prettierConfigRaw from '../../../prettier.config.cjs';
import path from 'path';
import PATHS from '../../../config/paths.js';
import fs from 'fs';
import TurndownService from 'turndown';
import Handlebars from 'handlebars';
import * as Utils from '../../../scripts/web-component-wrappers/utils.js';
import {
  COMPONENTS_WITHOUT_DEMOS,
  KNOWN_EVENTS,
  PRIVATE_COMPONENTS
} from '../../../scripts/web-component-wrappers/config.js';

Handlebars.registerPartial(
  'methodParameters',
  fs.readFileSync(path.join(PATHS.root, 'scripts', 'web-component-wrappers', 'MethodParameters.hbs')).toString()
);

Handlebars.registerHelper('convertToStringArray', function (array) {
  if (typeof array === 'string') return array;
  if (!Array.isArray(array)) return '';
  return `[${array.map((v) => `'${v}'`).join(', ')}]`;
});

Handlebars.registerHelper('join', function (array, separator) {
  if (typeof array === 'string') return array;
  if (!Array.isArray(array)) return '';
  separator = typeof separator === 'string' ? separator : ', ';
  return array.join(separator);
});

Handlebars.registerHelper('storySubComponents', function (subcomponents) {
  return `{{ ${subcomponents.join(', ')} }}`;
});

const testTemplate = Handlebars.compile(
  fs.readFileSync(path.join(PATHS.root, 'scripts', 'web-component-wrappers', 'TestTemplate.hbs')).toString()
);

const componentTemplate = Handlebars.compile(
  fs.readFileSync(path.join(PATHS.root, 'scripts', 'web-component-wrappers', 'ComponentTemplate.hbs')).toString()
);

const libraryExportTemplate = Handlebars.compile(
  fs.readFileSync(path.join(PATHS.root, 'scripts', 'web-component-wrappers', 'LibraryExportTemplate.hbs')).toString()
);

const storyTemplate = Handlebars.compile(
  fs.readFileSync(path.join(PATHS.root, 'scripts', 'web-component-wrappers', 'StoryTemplate.hbs')).toString()
);

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});
turndownService.keep(['ui5-link']);

// To only create a single component, replace "false" with the component (module) name
// or execute the following command: "yarn create-webcomponents-wrapper [name]"
const CREATE_SINGLE_COMPONENT = process.argv[2] || false;

const EXCLUDE_LIST = [];

const prettierConfig = {
  ...prettierConfigRaw,
  parser: 'typescript'
};

const WEB_COMPONENTS_ROOT_DIR = path.join(PATHS.packages, 'main', 'src', 'webComponents');
const DIST_DIR = path.join(PATHS.packages, 'main', 'src', 'dist');

const EXTENDED_PROP_DESCRIPTION = {
  primaryCalendarType: `<br/>__Note:__ Calendar types other than Gregorian must be imported manually:<br />\`import "@ui5/webcomponents-localization/dist/features/calendar/{primaryCalendarType}.js";\``
};

const CUSTOM_DESCRIPTION_REPLACE = {
  Avatar: {
    icon: (desc) => {
      return desc.replace(
        `   * import "@ui5/webcomponents-icons/dist/{icon\\_name}.js"  
   * 
   * <ui5-avatar icon-src="employee">`,
        `   * \`import "@ui5/webcomponents-icons/dist/{icon\\_name}.js"\`
   *
   * \`<Avatar icon="employee">\``
      );
    }
  },
  ComboBox: {
    children: (desc) => {
      return desc.replace(
        `   * Example:  
   * <ui5-combobox>  
   *     <ui5-li>Item #1</ui5-li>  
   *     <ui5-li>Item #2</ui5-li>  
   * </ui5-combobox>`,
        `   * Example:
   *
   * <pre>
   *   <code>
   *    &lt;ComboBox><br />
   *    &nbsp;&nbsp;&lt;StandardListItem>Item #1&lt;/StandardListItem><br />
   *    &nbsp;&nbsp;&lt;StandardListItem>Item #2&lt;/StandardListItem><br />
   *    &lt;/ComboBox>
   *  </code>
   * </pre>`
      );
    }
  },
  Input: {
    children: (description) => {
      const formatExample = description.replace(
        `   * Example:  
   *   
   * <ui5-input show-suggestions>  
   *     <ui5-suggestion-item text="Item #1"></ui5-suggestion-item>  
   *     <ui5-suggestion-item text="Item #2"></ui5-suggestion-item>  
   * </ui5-input>  `,
        `   * Example:
   *
   * <pre>
   *   <code>
   *    &lt;Input showSuggestions><br />
   *    &nbsp;&nbsp;&lt;SuggestionItem text="Item #1" /><br />
   *    &nbsp;&nbsp;&lt;SuggestionItem text="Item #2" /><br />
   *    &lt;/Input>
   *  </code>
   * </pre>`
      );
      return formatExample.replace(/<ui5-suggestion-item>/g, '`<SuggestionItem>`');
    }
  },
  MultiComboBox: {
    children: (desc) => {
      return desc.replace(
        `   * Example:  
   * <ui5-multi-combobox>  
   *     <ui5-li>Item #1</ui5-li>  
   *     <ui5-li>Item #2</ui5-li>  
   * </ui5-multi-combobox>`,
        `   * Example:
   *
   * <pre>
   *   <code>
   *    &lt;MultiComboBox><br />
   *    &nbsp;&nbsp;&lt;StandardListItem>Item #1&lt;/StandardListItem><br />
   *    &nbsp;&nbsp;&lt;StandardListItem>Item #2&lt;/StandardListItem><br />
   *    &lt;/MultiComboBox>
   *  </code>
   * </pre>`
      );
    }
  },
  MultiInput: {
    children: (description) => {
      const formatExample = description.replace(
        `   * Example:  
   *   
   * <ui5-input show-suggestions>  
   *     <ui5-suggestion-item text="Item #1"></ui5-suggestion-item>  
   *     <ui5-suggestion-item text="Item #2"></ui5-suggestion-item>  
   * </ui5-input>  `,
        `   * Example:
   *
   * <pre>
   *   <code>
   *    &lt;MultiInput showSuggestions><br />
   *    &nbsp;&nbsp;&lt;SuggestionItem text="Item #1" /><br />
   *    &nbsp;&nbsp;&lt;SuggestionItem text="Item #2" /><br />
   *    &lt;/MultiInput>
   *  </code>
   * </pre>`
      );
      return formatExample.replace(/<ui5-suggestion-item>/g, '`<SuggestionItem>`');
    },
    tokens: (description) => {
      return description.replace(
        `   * Example:  
   * <ui5-multi-input>  
   *     <ui5-token slot="tokens" text="Token 1"></ui5-token>  
   *     <ui5-token slot="tokens" text="Token 2"></ui5-token>  
   * </ui5-multi-input>`,
        `   * Example:
   *
   * <pre>
   *   <code>
   *    &lt;MultiInput<br />
   *    &nbsp;tokens={<br />
   *    &nbsp;&nbsp;&lt;><br />
   *    &nbsp;&nbsp;&nbsp;&lt;Token text="Token 1" /><br />
   *    &nbsp;&nbsp;&nbsp;&lt;Token text="Token 1" /><br />
   *    &nbsp;&nbsp;&lt;/><br />
   *    &nbsp;}<br />
   *    />
   *  </code>
   * </pre>`
      );
    }
  },
  ShellBar: {
    children: (desc) => {
      return desc.replace('<ui5-shellbar-item></ui5-shellbar-item>', '`ShellBarItem`');
    },
    menuItems: (desc) => {
      return desc.replace('<ui5-li></ui5-li>', '`StandardListItem`');
    }
  }
};

const componentsFromFioriPackage = new Set(fioriWebComponentsSpec.symbols.map((componentSpec) => componentSpec.module));

const interfaces = new Set();
const allWebComponents = [
  ...mainWebComponentsSpec.symbols.filter((spec) => !spec.module.startsWith('types/')),
  ...fioriWebComponentsSpec.symbols.filter((spec) => !spec.module.startsWith('types/'))
].filter((item) => {
  if (item.kind === 'interface') {
    interfaces.add(item.name);
    return false;
  }
  return true;
});

const htmlTagToModuleNameMap = new Map();
for (const spec of allWebComponents) {
  htmlTagToModuleNameMap.set(spec.tagname, spec.module);
}

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const snakeToCamel = (str) => str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
const filterNonPublicAttributes = (prop) =>
  prop.visibility === 'public' && prop.readonly !== 'true' && prop.static !== true;

const replaceTagNameWithModuleName = (description) => {
  let parsedDescription = description.replace(/(ui5-[\w-]+)/g, (fullMatch, tag, ...args) => {
    if (tag === 'ui5-link') return tag;
    if (tag === 'ui5-webcomponents-react') return tag;
    return htmlTagToModuleNameMap.get(tag);
  });

  parsedDescription = parsedDescription.replace(/`ui5-link/g, `\`${htmlTagToModuleNameMap.get('ui5-link')}`);

  // replace all tag occurrences in description with module name
  [...parsedDescription.matchAll(new RegExp(`<code>ui5-`, 'g'))].forEach(() => {
    const start = description.indexOf(`<code>ui5-`) + 6;
    const end = description.indexOf(`</code>`, start);
    const tagName = description.slice(start, end);
    if (htmlTagToModuleNameMap.has(tagName)) {
      description = description.replace(tagName, htmlTagToModuleNameMap.get(tagName));
    }
  });

  return parsedDescription;
};

const getEventParameters = (name, parameters) => {
  const resolvedEventParameters = parameters.map((property) => {
    return {
      ...property,
      ...Utils.getTypeDefinitionForProperty(property, interfaces)
    };
  });

  const importStatements = [`import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';`];

  const eventTarget = Utils.getEventTargetForComponent(name);

  if (resolvedEventParameters.length === 0) {
    return {
      tsType: `(event: Ui5CustomEvent<${eventTarget}>) => void`,
      importStatements
    };
  }

  const detailPayload = resolvedEventParameters.map((parameter) => {
    if (parameter.importStatement) {
      importStatements.push(parameter.importStatement);
    }
    return `${parameter.name}: ${parameter.tsType}`;
  });

  return {
    tsType: `(event: Ui5CustomEvent<${eventTarget}, {${detailPayload.join('; ')}}>) => void`,
    importStatements
  };
};

const createWebComponentWrapper = async (
  name,
  tag,
  description,
  types,
  importStatements,
  ref,
  defaultProps,
  regularProps,
  booleanProps,
  slotProps,
  eventProps
) => {
  const eventsToBeOmitted = eventProps.filter((eventName) => KNOWN_EVENTS.has(eventName));
  let tsExtendsStatement = 'CommonProps';
  if (eventsToBeOmitted.length > 0) {
    tsExtendsStatement = `Omit<CommonProps, ${eventsToBeOmitted
      .map((eventName) => `'on${capitalizeFirstLetter(snakeToCamel(eventName))}'`)
      .join(' | ')}>`;
  }
  let componentDescription;
  try {
    componentDescription = turndownService.turndown(description).replace(/\n/g, '\n * ');
  } catch (e) {
    console.warn(
      `----------------------\nHeader description of ${name} couldn't be generated. \nThere is probably a syntax error in the associated description that can't be fixed automatically.\n----------------------`
    );
    componentDescription = '';
  }

  const imports = [
    ...importStatements,
    '', // do not remove this empty line - otherwise the eslint/import-order plugin won't work as expected
    `import '@ui5/webcomponents${componentsFromFioriPackage.has(name) ? '-fiori' : ''}/dist/${name}';`
  ];

  return prettier.format(
    await Utils.runEsLint(
      componentTemplate({
        name,
        imports,
        propTypesExtends: tsExtendsStatement,
        types,
        description: componentDescription,
        tagName: tag,
        regularProps,
        booleanProps,
        slotProps: slotProps.filter((name) => name !== 'children'),
        eventProps,
        defaultProps,
        ref: ref?.tsType
      }),
      name
    ),
    prettierConfig
  );
};

const createWebComponentDemo = (componentSpec, componentProps, description) => {
  const componentName = componentSpec.module;
  const enumImports = [];
  const selectArgTypes = [];
  const args = [];
  const customArgTypes = [];

  console.warn(`Story created for ${componentName}!\nPlease remember to add the story to an existing group.`);

  const additionalComponentDocs = componentSpec.hasOwnProperty('appenddocs') ? componentSpec.appenddocs.split(' ') : [];
  const additionalComponentImports = additionalComponentDocs.map(
    (component) => `import { ${component} } from '@ui5/webcomponents-react/dist/${component}';`
  );

  componentProps.forEach((prop) => {
    if (prop.importStatement && prop.importStatement !== `import { ReactNode } from 'react';`) {
      enumImports.push(prop.importStatement);
    }
    if (componentSpec.module === 'Icon' && prop.name === 'name') {
      enumImports.push(`import "@ui5/webcomponents-icons/dist/employee.js";`);
      args.push(`name: 'employee'`);
    }
    if (prop.name === 'primaryCalendarType') {
      enumImports.push(`import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";`);
      enumImports.push(`import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";`);
      enumImports.push(`import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";`);
      enumImports.push(`import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";`);
      enumImports.push(`import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";`);
    }
    if (prop.name === 'moreColors') {
      enumImports.push(`import '@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js';`);
    }
    if (prop.name === 'children') {
      if (
        prop.description.includes(
          'Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.'
        )
      ) {
        args.push(`children: "${componentName} Text"`);
        customArgTypes.push(`children: {control: 'text'}`);
      } else {
        customArgTypes.push(`children: {control: {disable:true}}`);
      }
    } else if (prop.name === 'icon') {
      enumImports.push(`import "@ui5/webcomponents-icons/dist/employee.js";`);
      enumImports.push(`import { Icon } from '@ui5/webcomponents-react/dist/Icon';`);
      if (prop.tsType === 'string') {
        args.push(`icon: 'employee'`);
      }
      if (prop.tsType.includes('ReactNode')) {
        customArgTypes.push(`icon: {control: {disable: true}}`);
        args.push(`icon: <Icon name="employee" />`);
      }
    } else if (prop.tsType.includes('ReactNode') || prop.tsType === 'unknown') {
      customArgTypes.push(`${prop.name}: {control: {disable:true}}`);
    }
    if (prop.isEnum) {
      selectArgTypes.push(`${prop.name}: ${prop.tsType}`);
      const defaultValue = prop.defaultValue ? `.${prop.defaultValue.replace(/['"]/g, '')}` : '';
      args.push(`${prop.name}: ${prop.tsType}${defaultValue}`);
    }
  });
  //todo remove after 'react-docgen' can handle this
  args.push(`style: {}`);
  args.push(`className: ''`);
  args.push(`tooltip: ''`);
  args.push(`slot: ''`);
  args.push(`ref: null`);
  enumImports.push(`import { CSSProperties, Ref } from 'react';`);

  let formattedDescription = description
    .replace(/<br>/g, `<br/>`)
    .replace(/\s\s+/g, ' ')
    .replace(/h3/g, 'h2')
    .replace(/h4/g, 'h3');

  try {
    if (formattedDescription) {
      formattedDescription = turndownService.turndown(formattedDescription);
    }
  } catch (e) {
    formattedDescription = '';
    console.warn(
      `----------------------\nDescription of ${componentSpec.module} couldn't be generated. \nThere is probably a syntax error in the associated description that can't be fixed automatically.\n----------------------`
    );
  }

  return `${prettier.format(
    storyTemplate({
      name: componentName,
      imports: [...enumImports, ...additionalComponentImports],
      additionalComponentDocs,
      selectArgTypes,
      customArgTypes,
      args,
      methods: componentSpec.methods?.filter((item) => item.visibility === 'public') ?? []
    }),
    { ...prettierConfigRaw, parser: 'mdx' }
  )}\n${formattedDescription}`;
};

const assignComponentPropertiesToMaps = (componentSpec, { properties, slots, events, methods }) => {
  (componentSpec.properties || []).forEach((prop) => {
    if (!properties.has(prop.name)) {
      properties.set(prop.name, prop);
    }
  });
  (componentSpec.slots || []).forEach((slot) => {
    if (!slots.has(slot.name)) {
      slots.set(slot.name, slot);
    }
  });
  (componentSpec.events || []).forEach((event) => {
    if (!events.has(event.name)) {
      events.set(event.name, event);
    }
  });
  (componentSpec.methods || []).forEach((method) => {
    if (!methods.has(method.name)) {
      methods.set(method.name, method);
    }
  });
};

const recursivePropertyResolver = (componentSpec, { properties, slots, events, methods }) => {
  assignComponentPropertiesToMaps(componentSpec, { properties, slots, events, methods });
  if (
    componentSpec.extends === 'UI5Element' ||
    componentSpec.extends === 'sap.ui.webcomponents.base.UI5Element' ||
    componentSpec.extends === 'TabBase' // not longer existing but wrong docs, treat as UI5 Element
  ) {
    return { properties, slots, events, methods };
  }

  const parentComponent = allWebComponents.find((c) => {
    if (!componentSpec.extends) {
      debugger;
    }
    if (componentSpec.extends.includes('.')) {
      return c.name === componentSpec.extends;
    }
    return c.module === componentSpec.extends;
  });
  if (parentComponent) {
    return recursivePropertyResolver(parentComponent, {
      properties,
      slots,
      events,
      methods
    });
  }
  throw new Error('Unknown Parent Component!');
};

const resolveInheritedAttributes = (componentSpec) => {
  if (componentSpec.extends === 'UI5Element' || componentSpec.extends === 'sap.ui.webcomponents.base.UI5Element') {
    // no inheritance, just return the component
    return componentSpec;
  }

  const properties = new Map();
  const slots = new Map();
  const events = new Map();
  const methods = new Map();
  recursivePropertyResolver(componentSpec, { properties, slots, events, methods });

  componentSpec.properties = Array.from(properties.values());
  componentSpec.slots = Array.from(slots.values());
  componentSpec.events = Array.from(events.values());
  componentSpec.methods = Array.from(methods.values());

  return componentSpec;
};

allWebComponents
  .filter((spec) => spec.visibility === 'public')
  .filter((spec) => !PRIVATE_COMPONENTS.has(spec.module))
  .map(resolveInheritedAttributes)
  .forEach(async (componentSpec) => {
    const propTypes = [];
    const importStatements = [];
    const defaultProps = [];
    const allComponentProperties = [...(componentSpec.properties || []), ...(componentSpec.slots || [])]
      .filter((prop) => prop.visibility === 'public' && prop.readonly !== 'true' && prop.static !== true)
      .map((property) => {
        const tsType = Utils.getTypeDefinitionForProperty(property, interfaces);
        if (tsType.importStatement) {
          importStatements.push(tsType.importStatement);
        }

        if (property.name === 'default') {
          property.name = 'children';
        }
        const propDescription = () => {
          if (!componentSpec.tagname) {
            return property.description || '';
          }
          let formattedDescription = turndownService
            .turndown((property.description || '').trim())
            .replace(/\n/g, '\n   * ');

          const customDescriptionReplace = CUSTOM_DESCRIPTION_REPLACE[componentSpec.module];
          if (customDescriptionReplace && customDescriptionReplace[property.name]) {
            formattedDescription = customDescriptionReplace[property.name](formattedDescription);
          }

          const extendedDescription = EXTENDED_PROP_DESCRIPTION[property.name];

          if (property.name !== 'children' && componentSpec?.slots?.some((item) => item.name === property.name)) {
            formattedDescription += `
          *
          * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the \`slot\` prop and appends it to the most outer element of your component.
          * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).`;
          }

          if (extendedDescription) {
            return replaceTagNameWithModuleName(`${formattedDescription}${extendedDescription}`);
          }
          return replaceTagNameWithModuleName(formattedDescription);
        };

        propTypes.push(dedent`
    /**
     * ${propDescription()}
     */
     ${property.name}?: ${tsType.tsType};
    `);

        if (property.hasOwnProperty('defaultValue')) {
          if (tsType.tsType === 'boolean') {
            defaultProps.push(`${property.name}: ${property.defaultValue === 'true'}`);
          } else if (tsType.isEnum === true) {
            defaultProps.push(`${property.name}: ${tsType.tsType}.${property.defaultValue.replace(/['"]/g, '')}`);
          } else if (tsType.tsType !== 'string' || (tsType.tsType === 'string' && property.defaultValue !== '""')) {
            defaultProps.push(`${property.name}: ${property.defaultValue}`);
          }
        }

        return {
          ...property,
          ...tsType
        };
      });

    (componentSpec.events || [])
      .filter((eventSpec) => eventSpec.visibility === 'public')
      .forEach((eventSpec) => {
        let eventParameters;
        if (eventSpec.native === 'true') {
          if (eventSpec.name === 'click') {
            eventParameters = {
              tsType: 'MouseEventHandler<HTMLElement>',
              importStatements: ["import { MouseEventHandler } from 'react';"]
            };
          } else if (eventSpec.name === 'drop') {
            eventParameters = {
              tsType: 'DragEventHandler<HTMLElement>',
              importStatements: ["import { DragEventHandler } from 'react';"]
            };
          }
        } else {
          eventParameters = getEventParameters(componentSpec.module, eventSpec.parameters || []);
        }
        importStatements.push(...eventParameters.importStatements);
        propTypes.push(dedent`
      /**
       * ${replaceTagNameWithModuleName(
         turndownService.turndown((eventSpec.description || '').trim()).replace(/\n/g, '\n   * ')
       )}
       */
       on${capitalizeFirstLetter(snakeToCamel(eventSpec.name))}?: ${eventParameters.tsType};
      `);
      });

    const domRef = Utils.getDomRefTypingForComponent(componentSpec.module);
    if (domRef) {
      importStatements.push(domRef.importStatement);
    }

    const uniqueAdditionalImports = [...new Set(importStatements)];

    const formatDescription = () => {
      let description = componentSpec.description;
      if (!description) {
        return ['', ''];
      }
      //strip overview heading
      description = description.replace(`<h3 class="comment-api-title">Overview</h3>`, '');
      //strip ES6 Module import
      description = description.slice(0, description.indexOf(`<h3>ES6 Module Import</h3>`));
      if (!componentSpec.tagname) {
        return description.split(/(?=<h3>)/, 2);
      }
      //replace tag-name with module-name
      description = description.replace(new RegExp(componentSpec.tagname, 'g'), `${componentSpec.module}`);
      //replace other ui5 tag-names
      description = replaceTagNameWithModuleName(description);
      const [mainDescription, ...rest] = description.split(/(?=<h3>)/);
      return [mainDescription, rest.join('<h3>')];
    };

    const [mainDescription, description = ''] = formatDescription();

    if (EXCLUDE_LIST.includes(componentSpec.module)) {
      console.warn(
        `----------------------\n${componentSpec.module} has been excluded from component generation. To include it again remove the component name from the "EXCLUDE_LIST".\n----------------------`
      );
    }

    // check if folder exists and create it if necessary
    const webComponentFolderPath = path.join(WEB_COMPONENTS_ROOT_DIR, componentSpec.module);
    if (!fs.existsSync(webComponentFolderPath)) {
      fs.mkdirSync(webComponentFolderPath);
    }

    // create empty index file for eslint
    const webComponentWrapperPath = path.join(webComponentFolderPath, 'index.tsx');
    if (!fs.existsSync(webComponentWrapperPath)) {
      fs.writeFileSync(webComponentWrapperPath, '');
    }

    if (
      (CREATE_SINGLE_COMPONENT === componentSpec.module || !CREATE_SINGLE_COMPONENT) &&
      !EXCLUDE_LIST.includes(componentSpec.module)
    ) {
      const webComponentWrapper = await createWebComponentWrapper(
        componentSpec.module,
        componentSpec.tagname,
        mainDescription,
        propTypes,
        uniqueAdditionalImports,
        domRef,
        defaultProps,
        (componentSpec.properties || [])
          .filter(filterNonPublicAttributes)
          .filter(({ type }) => type !== 'boolean' && type !== 'Boolean')
          .map(({ name }) => name),
        (componentSpec.properties || [])
          .filter(filterNonPublicAttributes)
          .filter(({ type }) => type === 'boolean' || type === 'Boolean')
          .map(({ name }) => name),
        (componentSpec.slots || []).filter(filterNonPublicAttributes).map(({ name }) => name),
        (componentSpec.events || []).filter(filterNonPublicAttributes).map(({ name }) => name)
      );
      fs.writeFileSync(webComponentWrapperPath, webComponentWrapper);

      // create lib export
      const libContent = prettier.format(libraryExportTemplate({ name: componentSpec.module }), prettierConfig);
      fs.writeFileSync(path.join(DIST_DIR, `${componentSpec.module}.ts`), libContent);

      // create test
      if (!fs.existsSync(path.join(webComponentFolderPath, `${componentSpec.module}.test.tsx`))) {
        const webComponentTest = prettier.format(testTemplate({ name: componentSpec.module }), prettierConfig);
        fs.writeFileSync(path.join(webComponentFolderPath, `${componentSpec.module}.test.tsx`), webComponentTest);
      }

      // create demo
      if (
        CREATE_SINGLE_COMPONENT === componentSpec.module ||
        (!fs.existsSync(path.join(webComponentFolderPath, `${componentSpec.module}.stories.mdx`)) &&
          !COMPONENTS_WITHOUT_DEMOS.has(componentSpec.module))
      ) {
        const webComponentDemo = createWebComponentDemo(componentSpec, allComponentProperties, description);
        fs.writeFileSync(path.join(webComponentFolderPath, `${componentSpec.module}.stories.mdx`), webComponentDemo);
      }
    }
  });

import { CodeBlock, MapEditor } from 'mithril-materialized';
import m from 'mithril';

export const MapEditorPage = () => {
  const state = {
    properties: {
      stringArray: ['a', 'b', 'c'],
      numberArray: [1, 2, 3],
      aNumber: 42,
      aString: 'Hello world',
      truthy: true,
      falsy: false,
    },
  };
  const cells = [
    ['title 1', 'desc 1', 'high'],
    ['title 2', 'desc 2', 'medium'],
    ['title 3', 'desc 3', 'average'],
    ['title 4', 'desc 4', 'low'],
  ];

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Key-value pairs editor'),
        m('p', [
          'As materializecss.com did not offer a useful editor for a map of key-value pairs, ',
          'I have created one myself. It allows you to edit (or just view, when it is disabled), ',
          'booleans, numbers, strings and arrays of numbers and strings.',
        ]),

        // m(EditableTable, {
        //   headers: ['title', 'description', 'priority'],
        //   cells,
        //   addRows: true,
        // }),

        m('h3.header', 'MapEditor'),
        m(
          '.row',
          m(MapEditor, {
            label: 'Properties',
            isMandatory: true,
            properties: state.properties,
            onchange: (props: { [key: string]: number | string | boolean | Array<string | number> }) =>
              console.table(props),
            labelKey: 'Unique key', // Override the default label for keys i.e. 'key'
            labelValue: 'My value', // Overrule the default label for values i.e. 'key'
            disable: false, // If true, the map cannot be edited
            disallowArrays: false, // If true, do not convert [1, 2, 3] to a number[]
            keyValueConverter: undefined, // Allows you to overrule the view of each key-value pair
            iconName: 'dns',
            keyClass: '.col.s4', // Optionally override the default key element
            valueClass: '.col.s8', // Optionally override the default value element
            truthy: ['true', 'yes', 'ja', 'oui', 'si', 'da'],
            falsy: ['false', 'no', 'nee', 'nein', 'non', 'nu', 'njet'],
          })
        ),
        m(CodeBlock, {
          code: `          m(MapEditor, {
            label: 'Properties',
            isMandatory: true,
            properties: state.properties,
            onchange: (props: any) => console.table(props),
            labelKey: 'Unique key', // Override the default label for keys i.e. 'key'
            labelValue: 'My value', // Overrule the default label for values i.e. 'key'
            disable: false, // If true, the map cannot be edited
            disallowArrays: false, // If true, do not convert [1, 2, 3] to a number[]
            keyValueConverter: undefined, // Allows you to overrule the view of each key-value pair
            iconName: 'dns',
            keyClass: '.col.s4', // Optionally override the default key element
            valueClass: '.col.s8', // Optionally override the default value element
            truthy: ['true', 'yes', 'ja', 'oui', 'si', 'da'], // Any truthy value generates a boolean
            falsy: ['false', 'no', 'nee', 'nein', 'non', 'nu', 'njet'],
          })`,
        }),
      ]),
  };
};

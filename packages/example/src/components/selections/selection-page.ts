import m from 'mithril';
import {
  Select,
  CodeBlock,
  Options,
  Switch,
  RadioButtons,
  Dropdown,
  IDropdownOptions,
  ISelectOptions,
} from 'mithril-materialized';

export const SelectionPage = () => {
  const state = {
    checkedId: undefined as string | undefined,
    checkedIds: [0, 2],
  };

  const onchange = (v: unknown) => alert(`Input changed. New value: ${v}`);

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Selections'),

        m('h3.header', 'Select'),
        m(
          '.row',
          m(Select, {
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // placeholder: 'Pick one', // Alternative to first option
            isMandatory: true,
            checkedId: state.checkedId,
            options: [
              { label: 'Pick one', disabled: true },
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
            ],
            onchange,
          } as ISelectOptions)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Select, {
            // disabled: true, // Add disabled if you want to disable the select control
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // placeholder: 'Pick one', // Alternative to first option
            isMandatory: true,
            options: [
              { label: 'Pick one', disabled: true }, // IDs are optional: ID = label when missing
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
            ],
            onchange,
          })`,
        }),

        m('h3.header', 'Select multiple'),
        m(
          '.row',
          m(Select, {
            multiple: true,
            placeholder: 'Make a choice...',
            label: 'What are your favorite hobbies?',
            checkedId: state.checkedIds,
            onchange: v => {
              // state.checkedIds = v as number[];
              console.log(v);
            },
            options: [
              { id: 0, label: 'Watching movies' },
              { id: 1, label: 'Going out' },
              { id: 2, label: 'Reading' },
              { id: 3, label: 'Sex', disabled: true },
              { id: 4, label: 'Horse riding' },
            ],
          } as ISelectOptions)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(
            '.row',
            m(Select, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              checkedId: state.checkedIds, // [0, 2]
              onchange: v => {
                state.checkedIds = v as number[];
                console.log(v);
              },
              options: [
                { id: 0, label: 'Watching movies' },
                { id: 1, label: 'Going out' },
                { id: 2, label: 'Reading' },
                { id: 3, label: 'Sex', disabled: true },
                { id: 4, label: 'Horse riding' },
              ],
            } as ISelectOptions<number>)
          )`,
        }),

        m('h3.header', 'Options'),
        m(
          '.row',
          m(Options, {
            inline: true,
            label: 'What are your favorite hobbies?',
            isMandatory: true,
            checkedId: 'out',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: checkedIds => onchange(`Options ${checkedIds.join()} are checked.`),
          })
        ),
        m(
          '.row',
          m(Options, {
            label: 'What are your favorite hobbies?',
            isMandatory: true,
            checkedId: 'out',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: checkedIds => onchange(`Options ${checkedIds.join()} are checked.`),
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Options, {
            inline: true, // next one is false
            label: 'What are your favorite hobbies?',
            isMandatory: true,
            checkedId: 'out',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: checkedIds => onchange(\`Options \${checkedIds.join()} are checked.\`),
          })`,
        }),

        m('h3.header', 'RadioButtons'),
        m(
          '.row',
          m(RadioButtons, {
            inline: true,
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            checkedId: 'out',
            onchange,
          }),
          m(RadioButtons, {
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            checkedId: 'out',
            onchange,
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(RadioButtons, {
            inline: true, // next one is false
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange,
          })`,
        }),

        m('h3.header', 'Switch'),
        m(
          '.row',
          m(Switch, {
            label: 'What is your gender?',
            left: 'Man',
            right: 'Woman',
            onchange,
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Switch, {
            label: 'What is your gender?',
            left: 'Man',
            right: 'Woman',
            onchange,
          })`,
        }),

        m('h3.header', 'Dropdown'),
        m(
          '.row',
          m(Dropdown, {
            id: 'hobby',
            iconName: 'my_location',
            label: 'Pick a hobby',
            helperText: 'Help me',
            className: 'col s6',
            // disabled: true,
            // checkedId: 'movies',
            items: [
              { label: 'Movies', id: 'movies', iconName: 'local_movies' },
              { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
              { label: 'Eating', id: 'eating', iconName: 'restaurant' },
              { label: '', divider: true },
              { label: 'Sex', id: 'sex', iconName: 'group' },
            ],
            onchange: v => console.log(v),
          } as IDropdownOptions)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Dropdown, {
            id: 'hobby',
            iconName: 'my_location',
            label: 'Pick a hobby',
            helperText: 'Help me',
            className: 'col s6',
            // disabled: true,
            // checkedId: 'movies',
            items: [
              { label: 'Movies', id: 'movies', iconName: 'local_movies' },
              { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
              { label: 'Eating', id: 'eating', iconName: 'restaurant' },
              { label: '', divider: true },
              { label: 'Sex', id: 'sex', iconName: 'group' },
            ],
            onchange,
          })`,
        }),
      ]),
  };
};

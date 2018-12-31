import m, { Component } from 'mithril';
import { toDottedClassList } from './utils';
import { Label, HelperText } from './label';

/** Component to show a check box */
export const InputCheckbox = () => {
  return {
    view: ({ attrs }) => {
      const { contentClass, onchange, label, checked } = attrs;
      return m(
        `div${toDottedClassList(contentClass)}`,
        m('label', [
          m(`input[type=checkbox][tabindex=0]${checked ? '[checked]' : ''}`, {
            onclick: onchange
              ? (e: Event) => {
                  if (e.target && typeof (e.target as HTMLInputElement).checked !== 'undefined') {
                    onchange((e.target as HTMLInputElement).checked);
                  }
                }
              : undefined,
          }),
          m('span', m.trust(label)),
        ])
      );
    },
  } as Component<{
    /** Optional event handler when an option is clicked */
    onchange?: (checked: boolean) => void;
    /** Title or label of the option */
    label: string;
    /** If true, the option is checked */
    checked?: boolean;
    /** Optional CSS that is added to the div wrapper */
    contentClass?: string;
  }>;
};

export interface IInputOption {
  /** Option ID */
  id: string;
  /** Title or label */
  label: string;
  /** Is the option selected? */
  isChecked?: boolean;
}

/** A list of checkboxes */
export const Options = (): Component<{
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: IInputOption[];
  /** Event handler that is called when an option is changed */
  onchange?: (isChecked: boolean, id: string, option: IInputOption) => void;
  /** Optional description */
  description?: string;
  /** Optional CSS that is added to the option element (checkbox) */
  contentClass?: string;
  /** Optional CSS that is added to the div wrapper */
  titleClass?: string;
  /** If true, start on a new row */
  newRow?: boolean;
  /** If true, add a mandatory '*' after the label */
  isMandatory?: boolean;
}> => {
  return {
    view: ({ attrs: { label, id, options, onchange, description, contentClass, titleClass, newRow, isMandatory } }) => {
      const clear = newRow ? '.clear' : '';
      return m(`div${clear}${toDottedClassList(titleClass || 'col s12')}`, [
        m('h4', m(Label, { id, label, isMandatory })),
        m(HelperText, { helperText: description }),
        ...options.map(option =>
          m(InputCheckbox, {
            label: option.label,
            onchange: onchange ? (v: boolean) => onchange(v, option.id, option) : undefined,
            contentClass,
            checked: option.isChecked,
          })
        ),
      ]);
    },
  };
};
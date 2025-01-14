import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { IInputOption } from './option';
import { Label } from './label';

export interface IRadioButtons extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: IInputOption[];
  /** Event handler that is called when an option is changed */
  onchange: (id: string | number) => void;
  /** Selected id */
  checkedId?: string | number;
  /** Optional description */
  description?: string;
  /** If true, start on a new row */
  newRow?: boolean;
  /** If true, add a mandatory '*' after the label */
  isMandatory?: boolean;
  /** If true, draw the radio buttons inline */
  inline?: boolean;
}

/** Component to show a list of radio buttons, from which you can choose one. */
export const RadioButtons: FactoryComponent<IRadioButtons> = () => {
  const state = { groupId: uniqueId() } as {
    groupId: string;
    checkedId?: string | number;
    onchange: (id: string | number) => void;
  };
  return {
    oninit: ({ attrs: { onchange, checkedId } }) => {
      state.checkedId = checkedId;
      state.onchange = (id: string | number) => {
        state.checkedId = id;
        if (onchange) {
          onchange(id);
        }
      };
    },
    view: ({ attrs: { id, newRow, inline, className = 'col s12', label = '', description, options, isMandatory } }) => {
      const { groupId, onchange, checkedId } = state;
      const clear = newRow ? '.clear' : '';
      return m(`div${id ? `[id=${id}]` : ''}${clear}`, { className }, [
        m('h6', { style: 'margin-top: 0;' }, m(Label, { label, isMandatory })),
        description ? m('p.helper-text', m.trust(description)) : '',
        ...options.map(r =>
          m(RadioButton, {
            ...r,
            inline,
            onchange,
            groupId,
            checked: r.id === checkedId,
          })
        ),
      ]);
    },
  };
};

export interface IRadioButton extends Attributes {
  id: string | number;
  checked?: boolean;
  onchange: (id: string | number) => void;
  label: string;
  groupId: string;
  disabled?: boolean;
  inline?: boolean;
}

export const RadioButton: FactoryComponent<IRadioButton> = () => ({
  view: ({
    attrs: { id, groupId, label, onchange, inline, className = inline ? 'col' : 'col s12', checked, disabled },
  }) => {
    return m(
      `div`,
      { className, style: inline ? 'display: inline-block; margin: 0 2em 1em 0;' : '' },
      m('label', [
        m(
          `input[type=radio][tabindex=0][name=${groupId}]${checked ? '[checked=checked]' : ''}${
            disabled ? '[disabled]' : ''
          }`,
          {
            onclick: onchange ? () => onchange(id) : undefined,
          }
        ),
        m('span', m.trust(label)),
      ])
    );
  },
});

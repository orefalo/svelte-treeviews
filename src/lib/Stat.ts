// Todo: rename to NodeDecorator

export interface Stat {
  // TODO: that's the catch all, see if can be removed
  //  [x: string]: any;
  data: any;
  open: boolean;
  parent: Stat | null;
  children: Stat[];
  level: number;

  hidden: boolean;
  checked: boolean | 0; // 0 mean just part of children checked
  // 0 mean just part of children checked
  draggable: boolean | null; //null mean inhert parent
  //null mean inhert parent
  droppable: boolean | null; //null mean inhert parent
  //null mean inhert parent
  style: string | null;
  class: string | null;

  // used to identify if the data is a node or the data of the node
  isStat: true;

  _ignoreCheckedOnce: boolean
}

export interface OptionsStat extends Partial<Stat> {
  noInitialization?: boolean;
}

export function statDefault():OptionsStat {
  return {
    isStat: true,
    hidden: false,
    checked: false,
    style: null,
    class: null,
    draggable: null,
    droppable: null
  } 
}

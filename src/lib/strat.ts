export interface Stat<T> extends ReturnType<typeof statDefault> {
  [x: string]: any;
  data: T;
  open: boolean;
  parent: Stat<T> | null;
  children: Stat<T>[];
  level: number;
}

export function statDefault() {
  return {
    isStat: true,
    hidden: false,
    checked: false,
    style: null,
    class: null,
    draggable: null,
    droppable: null
  } as {
    isStat: true;
    hidden: boolean;
    checked: boolean | 0; // 0 mean just part of children checked
    draggable: boolean | null; //null mean inhert parent
    droppable: boolean | null; //null mean inhert parent
    style: any;
    class: any;
  };
}

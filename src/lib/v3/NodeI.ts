export interface NodeI {
  label: string;
  expanded?: boolean;
  children?: NodeIArray;
  checked?: boolean;
  indeterminate?: boolean;
}

export type OnToggleFn = (node: NodeI) => void;

export type NodeIArray = NodeI[];

export type NodeIDico = { [k: string]: NodeI };

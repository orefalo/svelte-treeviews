export interface NodeI {
  label: string;
  expanded?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  children?: Array<NodeI>;
}

export type NodeIArray = NodeI[];

export type NodeIDico = { [k: string]: NodeI };
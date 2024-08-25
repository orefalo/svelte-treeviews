export interface NodeI {
  label: string;
  expanded?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  children?: Array<NodeI>;
}

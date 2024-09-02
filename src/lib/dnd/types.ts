export interface Node {
    id:string
    name?:string
    color?: string
    items?: NodeArray
}
  
export type NodeArray = Array<Node>

export type NodeDico = { [k: string]: Node };
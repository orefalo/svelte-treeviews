import Node from '../lib/Node';
import { nanoid } from 'nanoid';

/**
 * Default Node's states
 */
const nodeStates = {
	selected: false,
	selectable: true,
	checked: false,
	expanded: false,
	disabled: false,
	visible: true,
	indeterminate: false,
	matched: false,
	editable: true,
	dragging: false,
	draggable: true,
	dropable: true
};

function merge(state = {}) {
	return Object.assign({}, nodeStates, state);
}

export default function objectToNode(tree, obj) {
	let node = null;

	if (obj instanceof Node) {
		return obj;
	}

	if (typeof obj === 'string') {
		node = new Node(tree, {
			text: obj,
			state: merge(),
			id: nanoid()
		});
	} else if (Array.isArray(obj)) {
		return obj.map((o) => objectToNode(tree, o));
	} else {
		node = new Node(tree, obj);
		node.states = merge(node.states);

		if (!node.id) {
			node.id = nanoid();
		}

		if (node.children.length) {
			node.children = node.children.map((child) => {
				child = objectToNode(tree, child);
				child.parent = node;

				return child;
			});
		}
	}

	return node;
}

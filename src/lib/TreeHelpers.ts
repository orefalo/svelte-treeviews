import orderBy from 'lodash.unionby'; // used by tree merge

//#region basic helpres

export function getParentNodePath(nodePath) {
	return nodePath?.substring(0, nodePath.lastIndexOf('.'));
}

export function hasChildren(tree, nodePath, propNames) {
	return tree?.find((x) => getParentNodePath(x[propNames.nodePathProperty]) === nodePath);
}

export function nodePathIsChild(nodePath) {
	return !nodePath || !!(nodePath.match(/\./g) || []).length;
}

export function getParentChildrenTree(tree, parentId, isChild, getParentId) {
	return (tree || []).filter((x) => (!parentId ? !isChild(x) : getParentId(x) === parentId));
}

export function allCHildren(tree, parentId, isChild, propNames) {
	const children = tree.filter((x) => {
		if (!parentId) {
			//top level
			return !isChild(x);
		} else {
			return x[propNames.nodePathProperty].startsWith(parentId.toString()) && x[propNames.nodePathProperty] != parentId;
		}
	});
	return children;
}

export function getAllLeafNodes(tree, propNames) {
	return tree.filter((x) => {
		return x[propNames.hasChildrenProperty] == undefined || x[propNames.hasChildrenProperty] == false;
	});
}

export function joinTrees(filteredTree, tree, propNames) {
	return tree.map(
		(tnode) =>
			filteredTree.find((fnode) => tnode[propNames.nodePathProperty] === fnode[propNames.nodePathProperty]) || tnode
	);
}

export function mergeTrees(oldTree, addedTree, nodePathProperty = 'nodePath') {
	return orderBy(addedTree, oldTree, nodePathProperty);
}

/** toggles expansion on
 */
export function changeExpansion(tree, node, changeTo, propNames) {
	return tree.map((x) => {
		const t = x;
		if (x[propNames.nodePathProperty] == node?.[propNames.nodePathProperty]) {
			t[propNames.expandedProperty] = changeTo;
		}
		return t;
	});
}

/** orders nodes by priorityProp
 */
export function OrderByPriority(tree, propNames) {
	tree.sort((a, b) => {
		if (b[propNames.priorityProperty] > a[propNames.priorityProperty]) return -1;
		return 1;
	});
	return tree;
}

/** changes expansion of every node that has hasChildren set to true
 */
export function changeEveryExpansion(tree, changeTo, propNames) {
	return tree.map((node) => {
		if (node[propNames.hasChildrenProperty] == true) node[propNames.expandedProperty] = changeTo;
		return node;
	});
}

/** changes expansion of every node that has hasChildren set to true if they are abose set level and expansion property isnt set
 */
export function expandToLevel(tree, level, propNames) {
	return tree.map((n) => {
		if (
			n[propNames.expandedProperty] == undefined &&
			n[propNames.expandedProperty] == null &&
			n[propNames.useCallbackProperty] != true &&
			getDepthLevel(n[propNames.nodePathProperty]) <= level
		) {
			n[propNames.expandedProperty] = true;
		}
		return n;
	});
}

//based on number of dots
function getDepthLevel(nodePath) {
	return nodePath.split('.').length - 1;
}

//#endregion

//#region selection

export function ChangeSelection(recursiveely, tree, nodePath, isChild, getParentId, filteredTree, propNames) {
	if (!recursiveely) {
		//non recursiveely
		return addOrRemoveSelection(tree, nodePath, propNames);
	} else {
		//recursiveely

		//only allow selection if it doesnt have any children
		tree = addOrRemoveSelection(tree, nodePath, propNames);
		return recomputeAllParentVisualState(tree, nodePath, isChild, getParentId, filteredTree, propNames);
	}
}

function addOrRemoveSelection(tree, nodePath, propNames) {
	return tree.map((x) => {
		const t = x;
		if (x[propNames.nodePathProperty] == nodePath) {
			t[propNames.selectedProperty] = !x[propNames.selectedProperty];
			//t.__visual_state = !x[propNames.selectedProperty];
		}
		return t;
	});
}

export function ChangeSelectForAllChildren(tree, parentId, isChild, changeTo, getParentId, filteredTree, propNames) {
	tree = tree.map((x) => {
		//changes itself
		if (parentId == x[propNames.nodePathProperty]) {
			x = changeSelectedIfNParent(x, changeTo, propNames);
		}

		if (!parentId) {
			//top level
			if (!isChild(x)) {
				x = changeSelectedIfNParent(x, changeTo, propNames);
			}
		} else {
			//if parentId isnt root
			if (
				x[propNames.nodePathProperty].startsWith(parentId.toString()) &&
				x[propNames.nodePathProperty] != parentId.toString()
			) {
				x = changeSelectedIfNParent(x, changeTo, propNames);
			}
		}
		return x;
	});
	tree = recomputeAllParentVisualState(tree, parentId, isChild, getParentId, filteredTree, propNames);
	return tree;
}

//changes selectedproperty or visual state depending on
function changeSelectedIfNParent(node, changeTo, propNames) {
	if (!node[propNames.hasChildrenProperty]) {
		node[propNames.selectedProperty] = changeTo;
	} else {
		node.__visual_state = changeTo.toString();
	}
	return node;
}

/**Calculates visual state based on children  */
function getVisualState(filteredTree, node, isChild, getParentId, propNames) {
	const children = getParentChildrenTree(filteredTree, node[propNames.nodePathProperty], isChild, getParentId);

	if (!children || children?.length == 0) return 'false';

	//if every child is selected or vs=true return true
	if (
		children.every((x) => {
			return x[propNames.selectedProperty] === true || x.__visual_state === 'true';
		})
	) {
		return 'true';
	}
	//not every child but at least one return indeterminate
	else if (
		children.some((x) => {
			return (
				x[propNames.selectedProperty] === true || x.__visual_state === 'indeterminate' || x.__visual_state === 'true'
			);
		})
	) {
		return 'indeterminate';
	} else {
		return 'false';
	}
}

/** recursibly recomputes parent visual state until root */
function recomputeAllParentVisualState(tree, nodePath, isChild, getParentId, filteredTree, propNames) {
	const parent = getParentId({ [propNames.nodePathProperty]: nodePath });

	let newstate;
	filteredTree.forEach((x) => {
		if (x[propNames.nodePathProperty] == parent) {
			newstate = getVisualState(filteredTree, x, isChild, getParentId, propNames);
			x.__visual_state = newstate;
			//console.log("recomputing" + parent + " ->" + newstate);
		}
	});
	if (getParentNodePath(parent) != '') {
		tree = recomputeAllParentVisualState(tree, parent, isChild, getParentId, filteredTree, propNames);
	}
	return tree;
}

/** Computes visual states for all nodes. Used for computing initial visual states when tree changes  */
export function computeInitialVisualStates(tree, isChild, getParentId, filteredTree, propNames) {
	const rootELements = getParentChildrenTree(tree, null, isChild, getParentId);
	rootELements.forEach((x) => {
		if (x[propNames.hasChildrenProperty] == true) {
			tree = computeChildrenVisualStates(tree, x, isChild, getParentId, filteredTree, propNames);
			x.__visual_state = getVisualState(filteredTree, x, isChild, getParentId, propNames);
		}
	});
	return tree;
}
/** Recursivly computes visual state for children  */
function computeChildrenVisualStates(tree, node, isChild, getParentId, filteredTree, propNames) {
	const children = getParentChildrenTree(tree, node[propNames.nodePathProperty], isChild, getParentId);
	//foreaches all children if it has children, it calls itself, then it computes __vs => will compute from childern to parent
	children.forEach((x) => {
		if (x[propNames.hasChildrenProperty] == true) {
			tree = computeChildrenVisualStates(tree, x, isChild, getParentId, filteredTree, propNames);
			x.__visual_state = getVisualState(filteredTree, x, isChild, getParentId, propNames);
		}
	});
	return tree;
}

export function deleteSelected(tree, propNames) {
	return tree.map((t) => {
		const x = t;
		x[propNames.selectedProperty] = false;
		x.__visual_state = undefined;
		return x;
	});
}

//#endregion

//#region drag and drop

/**
 * moves node from one parent to another
 * @param {Object[]} tree - tree
 * @param {nodePath} movedNodePath - nodepath of moved(dragged) node
 * @param {nodePath} targetNodePath - nodepath of node where it should be moved ( either bellow it in priority or as child)
 * @param {function} isChild - funcion to get if child
 * @param {int} insType - if true, it will insert moved node as child of target node, if false, it will insert it bellow it in priority
 * @param {boolean} recalculateNodePath - wont recalculare id of moved node, used when last part of nodePath is always unique
 * @param {Object} propNames - object where all propNames are stored
 */
export function moveNode(tree, movedNodePath, targetNodePath, isChild, insType, recalculateNodePath, propNames) {
	//console.log(insType);
	const nest = insType == 0;

	// if you are not nesting, you want to be on same level
	const parentNodePath = !nest ? getParentNodePath(targetNodePath) : targetNodePath;

	//trying to move parent to child
	if (parentNodePath.startsWith(movedNodePath)) return;

	const insideParent = !nest && getParentNodePath(movedNodePath) == getParentNodePath(targetNodePath);
	let newParentNodePath = movedNodePath;

	//dont create new node if you only moved inside same parent
	if (!insideParent) {
		let nodeId;
		if (recalculateNodePath) {
			nodeId = getNextNodeId(tree, parentNodePath, isChild, propNames);
		} else {
			nodeId = movedNodePath.substring(
				getParentNodePath(movedNodePath) ? getParentNodePath(movedNodePath).length + 1 : 0
			);
		}
		newParentNodePath = (parentNodePath ? parentNodePath + '.' : '') + nodeId;
	}

	//console.log(newParentNodePath);

	//* find target node
	const targetNode = tree.find((x) => x[propNames.nodePathProperty] == targetNodePath);
	let movedNode;

	//console.log("parentNodePath: " + newParentNodePath);

	tree = tree.map((node) => {
		//make sure that parent's haschild is set to true, so that children
		if (node[propNames.nodePathProperty] == parentNodePath) {
			node[propNames.hasChildrenProperty] = true;
			node[propNames.expandedProperty] = true;
		}

		//move moved nodes to new location ( if location is being changed)
		if (!insideParent && node[propNames.nodePathProperty].startsWith(movedNodePath)) {
			//replace old parent with new
			const newPath = node[propNames.nodePathProperty].replace(movedNodePath, newParentNodePath);
			//console.log(node[propNames.nodePathProperty] + " -> " + newPath);
			node[propNames.nodePathProperty] = newPath;
		}

		//if it is moved node
		if (node[propNames.nodePathProperty] == newParentNodePath) {
			movedNode = node;

			if (nest || targetNode[propNames.priorityProperty] != null) {
				let newpriority = 0;
				if (!nest) {
					//calculate next
					newpriority = targetNode[propNames.priorityProperty] ?? 0;
					if (insType == -1) {
						newpriority += 1;
					} else {
						//targetNode[propNames.priorityProperty] -= 1;
					}
				}

				//console.log("new priority:" + newpriority);

				InsertPriority(tree, parentNodePath, newParentNodePath, newpriority, isChild, propNames);

				node[propNames.priorityProperty] = newpriority;
			} else {
				//so old priority doesnt mess up orderring
				movedNode[propNames.priorityProperty] = undefined;
			}
		}
		return node;
	});

	//* insert node at right possition of array
	//

	const oldIndex = tree.findIndex((x) => x[propNames.nodePathProperty] == newParentNodePath);
	tree.splice(oldIndex, 1);

	const index = tree.findIndex((x) => x[propNames.nodePathProperty] == targetNode[propNames.nodePathProperty]);

	//insert below expcept if inspos is 1

	tree.splice(index + (insType == 1 ? 0 : 1), 0, movedNode);

	//TODO maybe add option to setting hasChildren to false when moved last children

	/*
	//hide plus icon if parent of moved node doesnt have any more children
	let oldParent = tree.find(
		(x) => x[propNames.nodePathProperty] == getParentNodePath(movedNodePath)
	);

	//moved
	if (
		oldParent &&
		!allCHildren(
			tree,
			oldParent[propNames.nodePathProperty],
			isChild,
			propNames
		).length
	) {
		oldParent[propNames.hasChildrenProperty] = false;
	}
*/
	return tree;
}

/** recomputes all priorities after inserted priority.F
 * Also changes all priorities to be one apart (1,5,6 => 1,2,3)
 */
function InsertPriority(tree, parentNode, movedNodePath, insertedPriority, isChild, propNames) {
	let nextPriority = insertedPriority + 1;
	OrderByPriority(allCHildren(tree, parentNode, isChild, propNames), propNames).forEach((n) => {
		if (n[propNames.priorityProperty] >= insertedPriority && n[propNames.nodePathProperty] != movedNodePath) {
			n[propNames.priorityProperty] = nextPriority++;
		}
	});
}

/** return biggest value of nodepath number that children are using +1 */
function getNextNodeId(tree, parentPath, isChild, propNames) {
	let max = '0';
	//findes biggest nodeNumber for
	allCHildren(tree, parentPath, isChild, propNames).forEach((node) => {
		const parent = getParentNodePath(node[propNames.nodePathProperty]);
		if (parent == parentPath) {
			const num = node[propNames.nodePathProperty].substring(parent ? parent.length + 1 : 0);
			if (parseInt(num) >= parseInt(max)) max = num;
		}
	});
	return parseInt(max) + 1;
}

export function getInsertionPosition(e, element) {
	const targetCords = element.getBoundingClientRect();
	const half = targetCords.bottom - targetCords.height / 2;

	if (e.y < half) {
		return 1;
	}
	return -1;
}

export function huminifyInsType(insType) {
	switch (insType) {
		case 1:
			return 'before';
		case 0:
			return 'inside';
		case -1:
			return 'after';
	}
}

//#endregion

//#region searching

//return filtered tree
export function searchTree(tree, filterFunction, recursive, propNames) {
	let result = [],
		matchingNodes = [];
	if (recursive) {
		matchingNodes = getAllLeafNodes(tree, propNames).filter(filterFunction);
	} else {
		matchingNodes = tree.filter(filterFunction);
	}
	//console.log("matching nodes length:" + matchingNodes.length)
	matchingNodes.forEach((node) => {
		result.push(node);
		result = addParents(tree, result, node);
	});
	//console.log(result)
	return result;
}

function addParents(tree, result, node, propNames) {
	const parentsIds = [],
		parentNodes = [];
	if (result === undefined) result = [];
	let nodePath = node[propNames.nodePathProperty];
	while (nodePath.length > 0) {
		nodePath = getParentNodePath(nodePath);
		parentsIds.push(nodePath);
	}

	//finds nodes for ids
	tree.forEach((n) => {
		if (
			parentsIds.some((parentId) => {
				return n[propNames.nodePathProperty] === parentId;
			})
		) {
			parentNodes.push(n);
		}
	});
	//removes duplicate nodePaths
	parentNodes.forEach((n) => {
		if (
			result.findIndex((x) => {
				return n[propNames.nodePathProperty] === x[propNames.nodePathProperty];
			}) < 0
		)
			result.push(n);
	});

	return result;
}

//#endregion

export default {
	getParentNodePath,
	hasChildren,
	nodePathIsChild,
	OrderByPriority,
	getParentChildrenTree,
	computeInitialVisualStates,
	changeExpansion,
	ChangeSelection,
	ChangeSelectForAllChildren,
	moveNode
};

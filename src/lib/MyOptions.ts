class MyOptions {

	private functions getNodeDataChildren(nodeData: any): any[] {
		if (!nodeData) {
		  return this.valueComputed;
		} else {
		  const { childrenKey } = this;
		  if (!nodeData[childrenKey]) {
			nodeData[childrenKey] = [];
		  }
		  return nodeData[childrenKey];
		}
	  };


}

handler(processor: typeof this.processor) {
	if (processor) {
	  // hook
	  const getNodeDataChildren = (nodeData: any): any[] => {
		if (!nodeData) {
		  return this.valueComputed;
		} else {
		  const { childrenKey } = this;
		  if (!nodeData[childrenKey]) {
			nodeData[childrenKey] = [];
		  }
		  return nodeData[childrenKey];
		}
	  };
	  processor["_statHandler2"] = this.statHandler
		? (stat) => {
		  if (stat.data === this.placeholderData) {
			return stat;
		  }
		  return this.statHandler!(stat);
		}
		: null;
	  processor.afterSetStat = (stat, parent, index) => {
		const { childrenKey, updateBehavior } = this;
		let value = this.valueComputed;
		if (updateBehavior === "new") {
		  if (this.batchUpdateWaiting) {
			return;
		  }
		  value = this.getData();
		} else if (updateBehavior === "modify") {
		  const siblings = getNodeDataChildren(parent?.data);
		  if (siblings.includes(stat.data)) {
			// when call add -> add child -> _setPositionm ignore because the child already in parent.children
		  } else {
			siblings.splice(index, 0, stat.data);
		  }
		} else if (updateBehavior === "disabled") {
		}
		if (this.batchUpdateWaiting) {
		  return;
		}
		this._updateValue(value);
	  };
	  processor.afterRemoveStat = (stat) => {
		const { childrenKey, updateBehavior } = this;
		let value = this.valueComputed;
		if (updateBehavior === "new") {
		  if (this.batchUpdateWaiting) {
			return;
		  }
		  value = this.getData();
		} else if (updateBehavior === "modify") {
		  const siblings = getNodeDataChildren(stat.parent?.data);
		  hp.arrayRemove(siblings, stat.data);
		} else if (updateBehavior === "disabled") {
		}
		if (this.batchUpdateWaiting) {
		  return;
		}
		this._updateValue(value);
	  };
	}
	if (!processor.initialized) {
	  processor.data = this.valueComputed;
	  Object.assign(
		processor,
		hp.objectOnly(this, ["childrenKey", "defaultOpen"])
	  );
	  processor.init();
	  processor.updateCheck();
	}
	this.stats = processor.stats!;
	this.statsFlat = processor.statsFlat!;
	if (processor.data !== this.valueComputed) {
	  this._updateValue(processor.data);
	}
},
  

valueComputed: {
	handler(value) {
	  // isDragging triggered in Vue2 because its array is not same with Vue3
	  const isDragging = this.dragOvering || this.dragNode
	  if (isDragging || this._ignoreValueChangeOnce) {
		this._ignoreValueChangeOnce = false;
	  } else {
		const { processor } = this;
		processor.data = value;
		processor.init();
		this.stats = processor.stats!;
		this.statsFlat = processor.statsFlat!;
	  }
	},
  },
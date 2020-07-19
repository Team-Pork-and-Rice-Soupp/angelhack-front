<template>
  <div class="logic-tree">
    <div v-for="(block, index) in logicTree" :key="index" class="logic-tree__block">
      <div class="node-wrapper">
        <div
          class="node"
          v-for="(node, nodeIndex) in block.node"
          :key="nodeIndex"
          :ref="index + 'and' + nodeIndex"
        >
          <span>{{node.label}}</span>
          <span style="display:none">{{node.pre}}</span>
          <q-btn size="8px" label="삭제" @click="onClickDelete(block,index, nodeIndex)" />
        </div>
      </div>
      <q-btn label="Add" @click="onClickAddNode(block, index)" />
    </div>

    <svg>
      <line
        :x1="item.left - 10"
        :y1="item.top - 160"
        :x2="item.preRight + 10"
        :y2="item.preTop - 160"
        stroke="black"
        v-for="(item, index) in svgList"
        :key="index"
      />
    </svg>

    <!-- Dialog -->
    <q-dialog v-model="dialogOpened" @hide="hideDialog">
      <div class="logictree-dialog">
        <div class="logictree-dialog__text">
          <div v-if="dialogIndex != 0" class="logictree-dialog__select">
            <span>이전 노드 선택</span>
            <div
              class="logictree-dialog__node"
              v-for="(node, index) in logicTree[dialogIndex - 1].node"
              :key="index"
            >
              <span>{{node.label}}</span>
              <q-btn
                :label="selected != node.label ? '선택' : '취소'"
                @click="onClickSelect(node.label)"
              />
            </div>
          </div>
          <div class="logictree-dialog__input">
            <span>내용 입력</span>
            <q-input filled v-model="dialogInput" />
          </div>
        </div>
        <div class="logictree-dialog__buttons">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="추가" color="blue" @click="onClickAdd" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vueName: "logicTree",
      dialogOpened: false,
      dialogData: {},
      dialogInput: "",
      dialogIndex: 0,
      selected: "",
      logicTree: [
        {
          node: []
        }
      ],
      svgList: []
    };
  },
  methods: {
    onClickAddNode(block, index) {
      this.dialogOpened = true;
      this.dialogData = block;
      this.dialogIndex = index;
      console.log(block, index);
    },
    onClickAdd() {
      if (this.dialogIndex != 0 && this.selected != "") {
        this.dialogData.node.push({
          pre: this.selected,
          label: this.dialogInput
        });
        if (this.dialogData.node.length == 1) {
          this.logicTree.push({
            node: []
          });
        }
        this.dialogOpened = false;
      } else if (this.dialogIndex == 0) {
        this.dialogData.node.push({
          label: this.dialogInput
        });
        if (this.dialogData.node.length == 1) {
          this.logicTree.push({
            node: []
          });
        }
        this.dialogOpened = false;
      } else {
        alert("이전 노드를 선택하세요.");
      }

      this.drawLine();
    },
    onClickSelect(label) {
      if (this.selected == label) {
        this.selected = "";
      } else {
        this.selected = label;
      }
    },
    onClickDelete(block, index, nodeIndex) {
      for (var i = this.logicTree[index + 1].node.length - 1; i >= 0; i--) {
        if (
          this.logicTree[index + 1].node[i].pre ==
          this.logicTree[index].node[nodeIndex].label
        ) {
          this.onClickDelete(this.logicTree[index + 1], index + 1, i);
        }
      }
      this.logicTree[index].node.splice(nodeIndex, 1);

      if (this.logicTree[index].node.length == 0 && this.logicTree[index + 1]) {
        this.logicTree.splice(index + 1, 1);
      }
      this.drawLine();
    },
    hideDialog() {
      this.dialogData = {};
      this.dialogIndex = 0;
      this.dialogInput = "";
      this.selected = "";
    },
    drawLine() {
      this.svgList = [];
      setTimeout(() => {
        let lineList = [];

        for (const [key, value] of Object.entries(this.$refs)) {
          console.log(value);
          if (value.length != 0) {
            let pushObj = {
              top: value[0].getBoundingClientRect().top,
              bottom: value[0].getBoundingClientRect().bottom,
              left: value[0].getBoundingClientRect().left,
              right: value[0].getBoundingClientRect().right,
              label: value[0].childNodes[0].innerHTML,
              pre: value[0].childNodes[1].innerHTML
            };
            lineList.push(pushObj);
          }
        }

        lineList.forEach((node, index) => {
          lineList.forEach((_node, _index) => {
            if (index != _index && node.label == _node.pre) {
              this.svgList.push({
                preTop: node.top,
                preBottom: node.bottom,
                preLeft: node.left,
                preRight: node.right,
                top: _node.top,
                bottom: _node.bottom,
                left: _node.left,
                right: _node.right
              });
            }
          });
        });
      }, 50);
    }
  }
};
</script>

<style lang="scss" scoped>
.logic-tree {
  display: flex;
  justify-content: space-around;
  height: 60vh;

  &__block {
    .node-wrapper {
      height: 90%;
      .node {
        border: 1px solid black;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        align-items: center;
        padding: 6px;
        span {
          margin-right: 10px;
        }
      }
    }
  }

  svg {
    position: absolute;
    width: 100%;
    height: 50%;
    z-index: -10;
  }
}
</style>

<style lang="scss">
.logictree-dialog {
  background-color: white;
  width: 40%;

  &__text {
    display: flex;
    padding: 20px;
    justify-content: center;
  }

  &__select {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__input {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__buttons {
    display: flex;
    border-top: 1px solid black;
    button {
      width: 50%;
    }
  }
}
</style>
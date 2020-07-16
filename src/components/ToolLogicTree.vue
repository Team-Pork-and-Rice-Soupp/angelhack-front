<template>
  <div class="logic-tree">
    <div v-for="(block, index) in logicTree" :key="index" class="logic-tree__block">
      <div class="node-wrapper">
        <div class="node" v-for="(node, index) in block.node" :key="index">{{node.label}}</div>
      </div>
      <q-btn label="Add" @click="onClickAddNode(block, index)" />
    </div>

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
      dialogOpened: false,
      dialogData: {},
      dialogInput: "",
      dialogIndex: 0,
      selected: "",
      logicTree: [
        {
          node: []
        }
      ]
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

      console.log(this.dialogInput);
    },
    onClickSelect(label) {
      if (this.selected == label) {
        this.selected = "";
      } else {
        this.selected = label;
      }
    },
    hideDialog() {
      this.dialogData = {};
      this.dialogIndex = 0;
      this.dialogInput = "";
      this.selected = "";
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
        justify-content: center;
      }
    }
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
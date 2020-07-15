<template>
  <div>
    <div v-for="(block, index) in logicTree" :key="index">
      <div>
        <div v-for="(node, index) in block.node" :key="index">{{node.label}}</div>
      </div>
      <q-btn label="Add" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["logicTree"]
};
</script>

<style lang="scss" scoped>
</style>
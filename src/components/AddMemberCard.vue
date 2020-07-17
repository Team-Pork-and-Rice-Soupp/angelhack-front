<template>
  <q-card class="add-member-card">
    <div class="member-info">
      <span>{{ this.memberInfo.name }}</span>
      <span>{{ this.memberInfo.email }}</span>
    </div>

    <div class="member-description">
      <slot name="input"></slot>
    </div>

    <q-card-actions>
      <q-btn label="삭제" @click="onClickDelete" flat v-if="!this.memberInfo.isMe" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "AddMemberCard",
  props: ["memberInfo"],
  data() {
    return {
      vueName: "add-members",
      memberEmail: "",
      member: null,
      memberDescription: "",
      memberRole: ""
    };
  },
  methods: {
    onClickDelete() {
      console.log("D");
    }
  }
};
</script>

<style lang="scss">
.add-member-card {
  // border: 1px black solid;
  padding: 5px;
  // width: 500px;
  // height: 300px;
  width: 100%;
  max-width: 300px;

  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  // border-radius: 29px;
  // background: #ffffff;
  // box-shadow: 5px 5px 10px #bdbdbd, -5px -5px 10px #ffffff;
  .member-info {
    padding-top: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      margin-left: 10px;
    }
  }
  .member-description {
    padding: 10px;
  }
}
</style>
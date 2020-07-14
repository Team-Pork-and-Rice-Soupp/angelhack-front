<template>
  <div class="add-member-card">
    <div class="member-info">
      <span>이름</span>
      <span>이메일</span>
    </div>
    <q-input label="설명" v-model="memberDescription" />
    <q-input label="역할" v-model="memberRole" />
    <q-btn label="삭제" @click="onClickDelete" flat />
  </div>
</template>

<script>
export default {
  name: "AddMemberCard",
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
  padding: 20px;
  margin-bottom: 40px;
  border-radius: 29px;
  background: #ffffff;
  box-shadow: 5px 5px 10px #bdbdbd, -5px -5px 10px #ffffff;
  .member-info {
    span {
      margin-left: 10px;
    }
  }
}
</style>
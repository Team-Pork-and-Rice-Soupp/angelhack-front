<template>
  <div class="add-member-card">
    <span>이름</span>
    <span>이메일</span>
    <q-input label="설명" />
    <q-input label="역할" />
    <q-btn label="삭제" @click="onClickDelete" />
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
      memberDescription: ""
    };
  },
  methods: {
    onClickDelete() {
      console.log("D");
    }
  }
};
</script>

<style>
.add-member-card {
  border: 1px black solid;
}
</style>
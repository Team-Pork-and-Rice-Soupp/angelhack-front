<template>
  <q-card class="add-member-card">
    <div class="top">
      <q-icon name="person" />
      <q-btn label="DELETE" flat color="red" @click="dialogOpened = true" v-if="!memberInfo.isMe" />
    </div>

    <span class="title">이름 : {{ memberInfo.name }}</span>
    <span class="title">이메일 : {{ memberInfo.email }}</span>

    <q-input filled label="팀원 설명" v-model="memberDescription" />
    <q-radio v-model="memberRole" val="MANAGER" label="Manager" />
    <q-radio v-model="memberRole" val="CREW" label="Crew" />

    <!-- Dialog -->
    <q-dialog v-model="dialogOpened">
      <div class="dashboard-dialog">
        <div class="dashboard-dialog__text">팀원을 삭제하시겠습니까?</div>
        <div class="dashboard-dialog__buttons">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="삭제" color="red" @click="onClickDelete" />
        </div>
      </div>
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  name: "AddMemberCard",
  props: ["memberInfo"],
  data() {
    return {
      vueName: "addMemberCard",
      dialogOpened: false,
      memberDescription: "",
      memberRole: null
    };
  },
  methods: {
    onClickDelete() {
      this.$parent.members.splice(
        this.$parent.members.findIndex(
          user => user.email == this.memberInfo.email
        ),
        1
      );
      this.dialogOpened = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-member-card {
  padding: 10px 15px;
  margin: 0 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  min-height: 160px;
  color: #070819;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    i {
      font-size: 35px;
      color: #070819;
    }
  }

  .title {
    font-size: 16px;
    margin-bottom: 8px;
  }
}
</style>
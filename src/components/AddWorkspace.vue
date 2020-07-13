<template>
  <div class="work-space-form">
    <q-input v-model="title" label="title" />
    <q-input v-model="description" label="description" autogrow />

    <q-form class="search-form" @submit="searchMember">
      <q-input ref="keyword" v-model="keyword" placeholder="검색어를 입력해주세요." />

      <div class="search-form__button">
        <q-btn flat label="Search" color="blue" type="submit" />
      </div>
    </q-form>

    <add-member-card></add-member-card>
    <!-- Dialog -->
    <q-dialog v-model="dialogOpened">
      <div>
        <div></div>
        <div></div>
        <div>
          <q-btn label="Cancle" v-close-popup />
          <q-btn label="Confirm" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import AddMemberCard from "./AddMemberCard.vue";

export default {
  name: "add-workspace",
  components: {
    AddMemberCard
  },
  data() {
    return {
      title: "",
      description: "",
      members: [],
      keyword: "",
      dialogOpened: false
    };
  },
  methods: {
    addingMember() {
      this.$children
        .find(el => el.vueName == "add-members")
        .addMember(res => {
          this.members.push(res);
        });
    },
    searchMember() {
      console.log(this.keyword);
      this.dialogOpened = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.work-space-form {
  width: 30%;
  .search-form {
    display: flex;
    justify-content: space-between;
    &__button {
      height: 100%;
    }
  }
}
</style>
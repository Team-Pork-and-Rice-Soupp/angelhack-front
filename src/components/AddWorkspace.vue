<template>
    <div class="work-space-form">
        <q-input v-model="title" label="title"/>
        <q-input v-model="description" label="description" autogrow />
        <add-members />
    </div>
</template>

<script>
import AddMembers from "./AddMembers.vue";

export default {
    name: "add-workspace",
    components: {
        AddMembers
    },
    data() {
        return {
            title: "",
            description: "",
            members: []
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
    }
};
</script>

<style lang="scss" scoped>
.work-space-form {
    width: 100px;
    .qinput {
        width: 300px;
    }
}
</style>
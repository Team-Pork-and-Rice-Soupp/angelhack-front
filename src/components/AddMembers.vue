<template>
    <div>
        <q-input v-model="memberEmail" label="member" @keydown.enter.exact="searchMember" />
        <div v-if="member">
            <q-input v-model="memberDescription" label="member description"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "add-members",
    // created() {
    //     this.member = {
    //         dummy: ""
    //     }
    // },
    data() {
        return {
            vueName: "add-members",
            memberEmail: "",
            member: null,
            memberDescription: ""
        };
    },
    methods: {
        addMember(cb) {
            cb(this.member);
        },
        searchMember() {
            let memberObj = this.ajaxMethod(this.memberEmail);
            if (memberObj) {
                this.member = memberObj;
            } else {
                alert("해당 가입자를 찾을 수 없습니다");
            }
        },
        ajaxMethod(email) {
            return {};
        }
    }
};
</script>

<style>
</style>
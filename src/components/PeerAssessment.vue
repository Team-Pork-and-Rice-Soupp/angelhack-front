<template>
    <div class="peer-assessment">
        <h3>동료 평가</h3>
        <div>
            <q-input
                v-for="(member, index) in members"
                :ref="'score' + index.toString()"
                :key="index"
                filled
                :label="member.name + ' 점수'"
                type="number"
                v-model="member.score"
                :rules="[
                    val => !!val || '점수를 입력해주세요.',
                    val => (val >= 1 && val <= 10) || '1 ~ 10 사이의 점수를 입력해주세요'
                ]"
            />
            
            <q-btn label="제출" color="primary" flat @click="submit" />
        </div>
    </div>
</template>

<script>
export default {
    name: "peer-assessment",
    props: ["step"], // 무슨 단계에서의 팀원평가인지 알기 위해 props로 단계의 정보를 부모로부터 받는다.
    data() {
        return {
            members: [
                {
                    name: "재훈이",
                    score: null
                },
                {
                    name: "주한이",                    
                    score: null
                },
                {
                    name: "아무개",
                    score: null
                }
            ],

        };
    },
    methods: {
        submit() {
            for(let i = 0; i < this.members.length; i++) {
                this.$refs["score" + i][0].validate();
            }
            let flag = true;
            for(let i = 0; i < this.members.length; i++) {
                if(!(this.members[i].score >= 1 && this.members[i].score <= 10)) {
                    alert(`1 ~ 10 사이의 점수를 입력해주세요 this.members[${i}].score >> ${this.members[i].score}`)
                    flag = false;
                    break;
                }
            }
            if(flag) {
                // api를 통해 서버로 데이터 제출
                // let obj = {
                //     workspace_id: "", // 토큰?
                //     step_id: "",
                //     scoreList: [
                //         {
                //             memberId: "",
                //             memberScore: ""
                //         },
                //         {
                //             memberId: "",
                //             memberScore: ""
                //         }
                //         ...
                //     ]
                // }
                // this.$store.dispatch(T.SUBMIT_PEER_SCORE, obj)
                alert("전송하였습니다.")
                this.$router.push('/Dashboard?id=mansbuy13579'); // router 수정 요망.
            }            
        }
    }
};
</script>

<style lang="scss" scoped>
.peer-assessment {
    width: 500px;
    margin: auto;
}
</style>
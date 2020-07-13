<template>
    <div style="background-color: #eeeeee;" class="card-container">
        <workspace-card :clickAction="action1">
            <template v-slot:card-title>워크스페이스 1</template>
            <template v-slot:card-description>이것은 워크스페이스1 입니다. 자식들아. 누가 뭐래도 내가 최고야.</template>
        </workspace-card>

        <workspace-card :clickAction="action1">
            <template v-slot:card-title>워크스페이스 2</template>
            <template v-slot:card-description>이것은 워크스페이스2 입니다. 가나다라마바사아 자차카타ㅠ파하.</template>
            <template v-slot:card-action>
                <q-btn label="나가기" @click="alert = true" flat color="red" />
            </template>
        </workspace-card>

        <!-- <workspace-card :clickAction="action1" v-for="i in 10" :key="i">
            <template v-slot:card-title>워크스페이스 2</template>
            <template v-slot:card-description>이것은 워크스페이스2 입니다. 가나다라마바사아 자차카타ㅠ파하.</template>
            <template v-slot:card-action>
                <q-btn label="나가기" @click="alert = true" flat color="red" />
            </template>
        </workspace-card> -->
        
        <br><br><br><br><br>

        <add-workspace />

        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section
                    class="q-pt-none"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import WorkspaceCard from "../components/WorkspaceCard.vue";
import AddWorkspace from "../components/AddWorkspace.vue";

export default {
    name: "temp-page",
    created() {
        console.log(this);
    },
    components: {
        WorkspaceCard,
        AddWorkspace
    },
    data() {
        return {
            alert: false,
        }
    },
    methods: {
        action1() {
            alert("action1");
        }
    }
};
</script>

<style lang="scss" scoped>
.card-container {
    display: flex;
    flex-basis: fit-content;
}
</style>
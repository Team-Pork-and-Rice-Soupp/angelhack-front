<template>
    <q-card @click="clickAction" class="worksapce-card">
        <q-card-section>
            <h1>
                <slot name="card-title"></slot>
            </h1>
        </q-card-section>

        <q-card-section>
            <p>
                <slot name="card-description"></slot>
            </p>
        </q-card-section>

    </q-card>
</template>

<script>
export default {
    name: "workspace-card",
    props: ["clickAction"],
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.worksapce-card {
    width: 100%;
    max-width: 250px;
    height: 100%;
    max-height: 250px;
    margin-right: 25px;
    background-color: #AAE0FF;
    color: white;
    &:hover {
        cursor: pointer;
    }
    h1 {
        font-size: 30px;        
    }
    p {
        font-size: 10px;
    }
}
</style>
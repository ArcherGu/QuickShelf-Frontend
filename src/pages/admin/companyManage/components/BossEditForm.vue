<template>
    <q-card>
        <q-form>
            <q-card-section>
                <span
                    class="text-h6"
                    v-text="$t('role.boss')"
                >
                </span>
            </q-card-section>
            <q-card-section>

            </q-card-section>
            <q-card-actions align="right">

            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script>

export default {
    name: 'BossEditForm',
    components: {},
    props: {
        bossId: {
            type: String,
            default: 0
        }
    },
    data() { return {} },
    mounted() {},
    methods: {

    },
    computed: {},
}

</script>

<style>
</style>
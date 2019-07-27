<template>
    <q-dialog
        v-model="myShow"
        ref="resetDialog"
    >

        <q-card style="width: 500px; max-width: 80vw;">
            <q-form @submit="resetPwd">
                <q-card-section>
                    <span
                        class="text-h6"
                        v-text="$t('operate.modify') + $t('auth.password')"
                    >
                    </span>
                </q-card-section>

                <q-card-section>
                    <q-input
                        v-model="userData.password"
                        :label="$t('auth.password')"
                        :rules="[ 
                            val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.password') }),
                            val => val && val.length >= 6 || $t('errors.easy_pwd', { num: 6 }),
                            val => /^[0-9A-Za-z]{6,}$/.test(val) || $t('errors.illegal_pwd')
                        ]"
                        lazy-rules
                        type="password"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="userData.confirmPassword"
                        :label="$t('auth.confirm_password')"
                        :rules="[ 
                            val => val && val === userData.password || $t('errors.diff_pwd')
                        ]"
                        lazy-rules
                        type="password"
                        outlined
                        dense
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        :label="$t('operate.confirm')"
                        type="submit"
                        color="positive"
                    />
                    <q-btn
                        :label="$t('operate.cancel')"
                        type="reset"
                        color="grey-7"
                        v-close-popup
                    />
                </q-card-actions>
            </q-form>
        </q-card>

    </q-dialog>
</template>

<script>
export default {
    name: '',
    components: {},
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },
    data() { return {} },
    mounted() {},
    methods: {
        resetPwd() {

        }
    },
    computed: {
        show(newVal) {
            this.myShow = newVal;
        },
        myShow(newVal) {
            this.$emit('show-dialog', newVal)
        }
    },
}

</script>

<style>
</style>
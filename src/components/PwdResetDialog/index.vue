<template>
    <q-dialog
        v-model="myShow"
        @before-hide="resetData"
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
                        v-model="password"
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
                        v-model="confirmPassword"
                        :label="$t('auth.confirm_password')"
                        :rules="[ 
                            val => val && val === password || $t('errors.diff_pwd')
                        ]"
                        lazy-rules
                        type="password"
                        outlined
                        dense
                    />
                    <div v-if="isAdmin">
                        <hr>
                        <q-input
                            v-model="adminFlag"
                            :label="$t('role.admin') + $t('common.flag')"
                            :rules="[ 
                                val => val && val.length > 0 || $t('errors.input_required', { item: $t('role.admin') + $t('common.flag') }),
                            ]"
                            class="q-mt-md"
                            bg-color="red-2"
                            lazy-rules
                            outlined
                            dense
                        />
                    </div>
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
import { resetUserPwdById, resetUserPwd } from '@/api/user';
import { CONST_ROLE } from "@/data/const";

export default {
    name: '',
    components: {},
    props: {
        show: {
            type: Boolean,
            default: false
        },
        isSelf: {
            type: Boolean,
            default: false
        },
        userId: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            default: ''
        }
    },
    data() { 
        return {
            myShow: this.show,
            password: '',
            confirmPassword: '',
            isAdmin: false,
            adminFlag: ''
        }
    },
    model: {
        prop: 'show',
        event: 'show-dialog'
    },
    mounted() {
        if (!this.isSelf && (this.userId === 0 || !this.role)) {
            console.error(new Error('You need to add "user-id" and "role" props to this component if you use "is-self=false"!'));
        }

        if (this.role == CONST_ROLE.BOSS) {
            this.isAdmin = true;
        }
    },
    methods: {
        resetPwd() {
            if (this.isSelf) {
                let user = this.$store.getters['auth/user'];
                resetUserPwd({ id: user.id, password: this.password }).then((response) => {
                    this.password = this.confirmPassword = '';
                    this.myShow = false;
                }).catch((error) => {
                    if (error.response) {
                        this.$q.dialog({
                            message: this.$t(error.response.data.result)
                        });
                    }
                })
            }
            else {
                resetUserPwdById(
                    this.userId,
                    { id: this.userId, password: this.password, adminFlag: this.adminFlag },
                    this.role
                ).then((response) => {
                    this.password = this.confirmPassword = '';
                    this.myShow = false;
                }).catch((error) => {
                    if (error.response) {
                        this.$q.dialog({
                            message: this.$t(error.response.data.result)
                        });
                    }
                })
            }
        },

        resetData() {
            this.password = this.confirmPassword = this.adminFlag = '';
        }
    },
    watch: {
        show(newVal) {
            this.myShow = newVal;
        },
        myShow(newVal) {
            this.$emit('show-dialog', newVal);
        }
    },
}

</script>

<style>
</style>
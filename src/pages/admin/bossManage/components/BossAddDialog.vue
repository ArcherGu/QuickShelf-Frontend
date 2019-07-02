<template>

    <q-dialog
        v-model="myShow"
        ref="addDialog"
    >

        <q-card style="width: 500px; max-width: 80vw;">
            <q-form @submit="save">
                <q-card-section>
                    <span
                        class="text-h6"
                        v-text="$t('operate.add')"
                    >
                    </span>
                </q-card-section>

                <q-card-section>
                    <q-input
                        v-model="addData.username"
                        :label="$t('auth.username')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.username') })]"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="addData.realName"
                        :label="$t('auth.real_name')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.real_name') })]"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="addData.phoneNumber"
                        :label="$t('auth.phone_number')"
                        :rules="[ 
                            val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.phone_number') }),
                            val => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val) || $t('errors.input_available', { item: $t('auth.phone_number') })
                        ]"
                        type="tel"
                        outlined
                        dense
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        :label="$t('operate.add') + $t('role.boss')"
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
import { doRegister, AUTH_TYPE } from "@/api/auth.js";

const defaultAddData = {
    username: '',
    realName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    company: '',
    maxShopNum: 1,
    adminPhone: '',
};

export default {
    name: 'BossAddDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            myShow: this.show,
            addData: defaultAddData,
        }
    },
    model: {
        prop: 'show',
        event: 'show-dialog'
    },
    mounted() {

    },
    methods: {
        save() {
            doRegister(this.addData, AUTH_TYPE.BOSS).then((response) => {
                this.$refs.addDialog.hide();
                this.addData = defaultAddData;
                this.$emit('refresh-table');
            }).catch((error) => {
                console.log(error);
            })
        },
    },
    computed: {

    },
    watch: {
        show(newVal) {
            this.myShow = newVal;
        },
        myShow(newVal) {
            this.$emit('show-dialog', newVal)
        }
    },
}
</script>
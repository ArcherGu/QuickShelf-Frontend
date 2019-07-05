<template>

    <q-dialog
        v-model="myShow"
        ref="addDialog"
    >

        <q-card style="width: 500px; max-width: 80vw;">
            <q-form @submit="addUser">
                <q-card-section>
                    <span
                        class="text-h6"
                        v-text="$t('operate.add')"
                    >
                    </span>
                </q-card-section>

                <q-card-section>
                    <q-input
                        v-model="userData.username"
                        :label="$t('auth.username')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.username') })]"
                        lazy-rules
                        outlined
                        dense
                    />
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
                    <q-input
                        v-model="userData.realName"
                        :label="$t('auth.real_name')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.real_name') })]"
                        lazy-rules
                        outlined
                        dense
                    />
                    <q-input
                        v-model="userData.phoneNumber"
                        :label="$t('auth.phone_number')"
                        :rules="[ 
                            val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.phone_number') }),
                            val => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val) || $t('errors.input_available', { item: $t('auth.phone_number') })
                        ]"
                        lazy-rules
                        outlined
                        dense
                    />
                    <q-input
                        v-model="companyData.name"
                        :label="$t('company.self')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('company.self') })]"
                        lazy-rules
                        outlined
                        dense
                    />
                    <div>
                        <span v-text="$t('common.max') + $t('shop.self') + $t('common.amount') + ': '"></span>
                        <q-badge color="green" :label="companyData.maxShopNum" />
                        <q-slider
                            v-model="companyData.maxShopNum"
                            :min="1"
                            :max="20"
                            :step="1"
                            color="light-green"
                        />
                    </div>
                    <hr>
                    <q-input
                        v-model="userData.adminFlag"
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
import { addOrEditCompany } from "@/api/admin/company_manage.js";

const defaultUserData = {
    username: '',
    realName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    adminFlag: '',
};

const defaultCompanyData = {
    id: 0,
    bossId: 0,
    name: '',
    maxShopNum: 1,
    isUse: 1
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
            userData: defaultUserData,
            companyData: defaultCompanyData,
        }
    },
    model: {
        prop: 'show',
        event: 'show-dialog'
    },
    mounted() {

    },
    methods: {
        addUser() {
            doRegister(this.userData, AUTH_TYPE.BOSS).then((response) => {
                this.addCompany(response.data.result);
            }).catch((error) => {
                if (error.response) {
                    this.$q.dialog({
                        message: this.$t(error.response.data.result)
                    })
                }
            })
        },

        addCompany(bossId) {
            this.companyData.bossId = bossId;
            addOrEditCompany(this.companyData).then((response) => {
                this.userData = defaultUserData;
                this.companyData = defaultCompanyData;

                this.$refs.addDialog.hide();
                this.$emit('refresh-table');
            }).catch((error) => {
                if (error.response) {
                    this.$q.dialog({
                        message: this.$t(error.response.data.result)
                    })
                }
            })
        }
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
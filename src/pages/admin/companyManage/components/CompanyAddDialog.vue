<template>

    <q-dialog
        v-model="myShow"
        ref="addDialog"
    >

        <q-card style="width: 500px; max-width: 80vw;">
            <q-form @submit="addBoss">
                <q-card-section>
                    <span
                        class="text-h6"
                        v-text="$t('operate.add')"
                    >
                    </span>
                </q-card-section>

                <q-card-section>
                    <q-input
                        v-model="companyData.name"
                        @input="check.bLoading = true"
                        @blur="checkCompanyName"
                        :label="$t('company.self')"
                        :rules="[ 
                            val => val && val.length > 0 || $t('errors.input_required', { item: $t('company.self') }),
                        ]"
                        :error="!check.bNameCheck"
                        :error-message="$t('errors.input_exist', { item: $t('company.self')})"
                        lazy-rules
                        outlined
                        dense
                    />
                    <dist-picker v-model="companyDist"></dist-picker>
                    <q-input
                        v-model="companyData.address"
                        :label="$t('district.address')"
                        class="q-mt-md"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="companyData.phone_number"
                        :label="$t('common.telephone')"
                        :rules="[ val => verifyPhoneNumber(val) ]"
                        type="tel"
                        class="q-mt-md"
                        lazy-rules
                        outlined
                        dense
                    />
                    <div>
                        <span v-text="$t('common.max') + $t('shop.self') + $t('common.amount') + ': '"></span>
                        <q-badge color="green" :label="companyData.max_shop_num" />
                        <q-slider
                            v-model="companyData.max_shop_num"
                            :min="1"
                            :max="20"
                            :step="1"
                            color="light-green"
                        />
                    </div>
                    <hr>
                    <q-input
                        v-model="userData.username"
                        :loading="check.aLoading"
                        @blur="checkBossUsername"
                        :label="$t('auth.username')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.username') })]"
                        :error="!check.aNameCheck"
                        :error-message="$t('errors.input_exist', { item: $t('auth.username')})"
                        lazy-rules
                        class="q-mt-md"
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
                        v-model="userData.real_name"
                        :label="$t('auth.real_name')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.real_name') })]"
                        lazy-rules
                        outlined
                        dense
                    />
                    <q-input
                        v-model="userData.phone_number"
                        :label="$t('auth.phone_number')"
                        :rules="[
                            val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.phone_number') }),
                            val => verifyPhoneNumber(val) 
                        ]"
                        type="tel"
                        lazy-rules
                        outlined
                        dense
                    />
                    <hr>
                    <q-input
                        v-model="companyData.adminFlag"
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
                        :label="$t('operate.add') + $t('company.self')"
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
import DistPicker from "@/components/DistPicker";
import { createUser, checkUsername, USER_TYPE } from "@/api/user.js";
import { saveCompany, checkCompanyName } from "@/api/company.js";
import { verifyPhoneNumber } from "@/utils";

const defaultUserData = {
    username: '',
    real_name: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
};

const defaultCompanyDist = {
    province: '',
    city: '',
    area: '',
};

const defaultCompanyData = {
    id: 0,
    boss_id: 0,
    name: '',
    ...defaultCompanyDist,
    address: '',
    phone_number: '',
    max_shop_num: 1,
    adminFlag: '',
};

export default {
    name: 'CompanyAddDialog',
    components: {
        DistPicker
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            myShow: this.show,
            userData: { ...defaultUserData },
            companyData: { ...defaultCompanyData },
            companyDist: { ...defaultCompanyDist },
            check: {
                aNameCheck: true, //Username
                bNameCheck: true, //Company Name
                aLoading: false,
                bLoading: false,
            }
        }
    },
    model: {
        prop: 'show',
        event: 'show-dialog'
    },
    mounted() {

    }, 
    methods: {
        addBoss() {
            createUser(this.userData, USER_TYPE.BOSS).then((response) => {
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
            this.companyData.boss_id = bossId;
            saveCompany(this.companyData).then((response) => {
                this.userData = { ...defaultUserData };
                this.companyData = { ...defaultCompanyData };
                this.companyDist = { ...defaultCompanyDist };

                this.$refs.addDialog.hide();
                this.$emit('refresh-table');
            }).catch((error) => {
                if (error.response) {
                    this.$q.dialog({
                        message: this.$t(error.response.data.result)
                    })
                }
            })
        },

        checkBossUsername() {
            this.check.aLoading = true;
            checkUsername(this.userData.username).then((response) => {
                if (response.data.result == "success") {
                    this.check.aNameCheck = true;
                }
                else{
                    this.check.aNameCheck = false;
                }
            }).finally(() => {
                this.check.aLoading = false;
            })
        },

        checkCompanyName() {
            this.check.bLoading = true;
            checkCompanyName(this.companyData.name).then((response) => {
                if (response.data.result == "success") {
                    this.check.bNameCheck = true;
                }
                else{
                    this.check.bNameCheck = false;
                }
            }).finally(() => {
                this.check.bLoading = false;
            })
        },

        verifyPhoneNumber,
    },
    computed: {

    },
    watch: {
        companyDist: {
            handler: function(newVal) {
                this.companyData.province = newVal.province;
                this.companyData.city = newVal.city;
                this.companyData.area = newVal.area;
            },
            deep: true
        },
        show(newVal) {
            this.myShow = newVal;
        },
        myShow(newVal) {
            this.$emit('show-dialog', newVal)
        }
    },
}
</script>
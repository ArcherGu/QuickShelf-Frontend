<template>
    <q-card ref="myCard">
        <q-form @submit="saveCompanyData">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title v-text="showData.name">
                    </q-toolbar-title>
                    <q-btn
                        outline
                        round
                        dense
                        icon="edit"
                        color="primary"
                        v-show="!isEdit"
                        @click="isEdit = true"
                    />
                </q-toolbar>
            </q-card-section>
            <q-card-section v-if="isEdit">
                <dist-picker v-model="companyDist"></dist-picker>
                <q-input
                    v-model="editData.address"
                    :label="$t('district.address')"
                    class="q-mt-md"
                    outlined
                    dense
                />
                <q-input
                    v-model="editData.phone_number"
                    :label="$t('common.telephone')"
                    :rules="[ val => verifyPhoneNumber(val) ]"
                    type="tel"
                    class="q-mt-md"
                    lazy-rules
                    outlined
                    dense
                />
                <hr>
                <q-input
                    v-model="editData.adminFlag"
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
            <q-card-section v-else class="row">
                <div class="col-xs-12 col-sm-12 col-md-4 column items-center">
                    <q-circular-progress
                        show-value
                        class="text-light-blue q-ma-md"
                        :value="showData.currentShopNum"
                        :min="0"
                        :max="showData.max_shop_num"
                        size="100px"
                        :thickness="0.2"
                        color="light-blue"
                        track-color="grey-3"
                    >
                        {{ showData.currentShopNum }}/{{ showData.max_shop_num }}
                    </q-circular-progress>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-8">
                    <q-list>
                        <q-item class="row">
                            <q-item-section class="col-4">
                                <span class="text-subtitle1 text-weight-bold">
                                    <q-icon name="local_phone" />
                                    {{$t('common.telephone')}}
                                </span>
                            </q-item-section>

                            <q-item-section class="col-8">
                                <span class="text-subtitle1">
                                    {{ showData.phone_number }}
                                </span>
                            </q-item-section>
                        </q-item>
                        <q-item class="row">
                            <q-item-section class="col-4">
                                <span class="text-subtitle1 text-weight-bold">
                                    <q-icon name="home" />
                                    {{$t('district.address')}}
                                </span>
                            </q-item-section>

                            <q-item-section class="col-8">
                                <span class="text-subtitle1">
                                    {{ detailDist }}
                                    <br>
                                    {{ showData.address }}
                                </span>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </q-card-section>
            <q-card-actions v-if="isEdit" align="right">
                <q-btn
                    :label="$t('operate.confirm')"
                    type="submit"
                    color="positive"
                />
                <q-btn
                    :label="$t('operate.cancel')"
                    type="reset"
                    color="grey-7"
                    @click="cancelEdit"
                />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script>
import DistPicker from "@/components/DistPicker";
import { getCompanyInfo, addOrEditCompany } from "@/api/admin/company.js";
import { getDetailsDist } from "@/api/district.js";
import { verifyPhoneNumber } from "@/utils";

const defaultCompanyDist = {
    province: '',
    city: '',
    area: '',
};

const defaultCompanyData = {
    id: 0,
    is_use: 0,
    name: '',
    phone_number: '',
    boss_id: 0,
    bossName: '',
    currentShopNum: 0,
    max_shop_num: 0,
    ...defaultCompanyDist,
    address: '',
    adminFlag: '',
};

export default {
    name: 'CompanyEditForm',
    components: {
        DistPicker
    },
    props: {
        companyId: {
            type: String,
            default: 0
        },
    },
    data() {
        return {
            showData: { ...defaultCompanyData },
            editData: { ...defaultCompanyData },
            companyDist: { ...defaultCompanyDist },
            detailDist: "",
            isEdit: false,
            chartValue: 3,
        }
    },
    model: {
        prop: 'result',
        event: 'change'
    },
    created() {
        this.getCompanyData();
    },
    mounted() {

    },
    methods: {
        getCompanyData() {
            getCompanyInfo(this.companyId).then((response) => {
                this.showData = { ...response.data.result };
                this.editData = { ...response.data.result, adminFlag: '' };
                this.companyDist = {
                    province: this.editData.province,
                    city: this.editData.city,
                    area: this.editData.area,
                };
                this.$bus.$emit('get-boss-id-from-company', this.editData.boss_id);
                this.getDistrict();
            })
        },

        getDistrict() {
            let data = {
                province: this.showData.province,
                city: this.showData.city,
                area: this.showData.area
            };
            getDetailsDist(data).then((response) => {
                if (response.data.result) {
                    this.detailDist = response.data.result.province;
                    this.detailDist += response.data.result.city? ` ${response.data.result.city}` : "";
                    this.detailDist += response.data.result.area? ` ${response.data.result.area}` : "";
                }
            })
        },

        saveCompanyData() {
            addOrEditCompany(this.editData).then((response) => {
                this.isEdit = false;
                this.getCompanyData();
            }).catch((error) => {
                if (error.response) {
                    this.$q.dialog({
                        message: this.$t(error.response.data.result)
                    })
                }
            })
        },

        cancelEdit() {
            this.editData = { ...this.showData };
            this.isEdit = false;
        },

        verifyPhoneNumber,
    },
    computed: {},
    watch: {
        companyDist: {
            handler: function(newVal) {
                this.editData.province = newVal.province;
                this.editData.city = newVal.city;
                this.editData.area = newVal.area;
            },
            deep: true
        }
    }
}

</script>

<style>
</style>
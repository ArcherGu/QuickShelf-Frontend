<template>
    <div style="height: 100%">
        <q-card ref="myCard" style="height: 100%">
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
    </div>
</template>

<script>
import DistPicker from "@/components/DistPicker";
import { getCompanyById, saveCompany } from "@/api/company";
import { getDetailsDist } from "@/api/district";
import { verifyPhoneNumber } from "@/utils";
import { DEF_DIST_DATA, DEF_COMPANY_DATA } from "@/data/default";

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
            showData: { ...DEF_COMPANY_DATA },
            editData: { ...DEF_COMPANY_DATA },
            adminFlag: '',
            companyDist: { ...DEF_DIST_DATA },
            detailDist: '',
            isEdit: false
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
            getCompanyById(this.companyId).then((response) => {
                this.formatCompanyData(response.data.result);
                this.$bus.$emit('get-boss-id-from-company', response.data.result.boss_id);
            })
        },

        saveCompanyData() {
            saveCompany({ ...this.editData, adminFlag: this.adminFlag }).then((response) => {
                this.isEdit = false;
                this.formatCompanyData(response.data.result);
            }).catch((error) => {
                if (error.response) {
                    this.$q.dialog({
                        message: this.$t(error.response.data.result)
                    })
                }
            })
        },

        formatCompanyData(result) {
            this.showData = { ...result };
            this.editData = { ...result };
            this.companyDist = {
                province: result.province,
                city: result.city,
                area: result.area,
            };

            this.detailDist = result.provinceName;
            this.detailDist += result.cityName ? ` ${result.cityName}` : "";
            this.detailDist += result.areaName? ` ${result.areaName}` : "";
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
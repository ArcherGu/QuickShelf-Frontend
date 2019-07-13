<template>
    <q-card ref="myCard">
        <q-form>
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
                <dist-picker :only-view="true"></dist-picker>
            </q-card-section>
            <q-card-section v-else class="row">
                <div class="col-xs-12 col-sm-4 column items-center">
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
                <div class="col-xs-12 col-sm-8">
                    <!-- <div class="row">
                        <div class="col-3 text-subtitle1 text-weight-bold">
                            <q-icon name="local_phone" />
                            <span v-text="$t('common.telephone')"></span>
                        </div>
                        <div class="col-9 text-subtitle1">
                            {{ showData.phone_number }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3 text-subtitle1 text-weight-bold">
                            <q-icon name="home" />
                            <span v-text="$t('district.address')"></span>
                        </div>
                        <div class="col-9 text-subtitle1">
                            {{ detailDist }}
                            <br>
                            {{ showData.address }}
                        </div>
                    </div> -->
                    <q-list>
                        <q-item>
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
                        <q-item>
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
            <q-card-actions align="right">

            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script>
import DistPicker from "@/components/DistPicker";
import { getCompanyInfo } from "@/api/admin/company.js";
import { getDetailsDist } from "@/api/district.js";

const defaultCompanyData = {
    id: 0,
    is_use: 0,
    name: '',
    phone_number: '',
    boss_id: 0,
    bossName: '',
    currentShopNum: 0,
    max_shop_num: 0,
    province: '',
    city: '',
    area: '',
    address: '',
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
                this.editData = { ...response.data.result };
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
        }
    },
    computed: {},
}

</script>

<style>
</style>
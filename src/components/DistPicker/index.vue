<template>
    <div class="row q-gutter-sm">
        <q-select
            v-model="selfResult.province"
            emit-value
            map-options
            outlined
            dense
            class="col"
            @input="changeProvince"
            :label="$t('district.province')"
            :options="provinces"
        />
        <q-select
            v-model="selfResult.city"
            emit-value
            map-options
            outlined
            dense
            class="col"
            @input="changeCity"
            :label="$t('district.city')"
            :options="cities"
        />
        <q-select
            v-model="selfResult.area"
            emit-value
            map-options
            outlined
            dense
            class="col"
            :label="$t('district.area')"
            :options="areas"
        />
    </div>
</template>

<script>
import { getAllProvinces, getCitiesByProvince, getAreasByCity } from "@/api/district.js";
import { i18nInstance } from 'boot/i18n';
import { isArray } from "@/utils";

const emptyOption = {
    label: i18nInstance.t('common.none'),
    value: ''
};

export default {
    name: 'DistPicker',
    props: {
        result: {
            type: Object,
            default() {
                return {
                    province: '',
                    city: '',
                    area: '',
                }
            }
        },
    },
    data() { 
        return {
            selfResult: this.result,
            provinces: [],
            cities: [],
            areas: [],
        } 
    },
    model: {
        prop: 'result',
        event: 'change'
    },
    created() {

    },
    mounted() {
        this.getProvinces();
        if (this.selfResult.city) {
            this.getCities();
        }
        if (this.selfResult.area) {
            this.getAreas();
        }
    },
    methods: {
        changeProvince() {
            this.selfResult.city = '';
            this.getCities();
            this.changeCity();
        },

        changeCity() {
            this.selfResult.area = '';
            this.getAreas();
        },

        getProvinces() {
            getAllProvinces().then((response) => {
                if (isArray(response.data.result)) {
                    response.data.result.forEach((it) => {
                        this.provinces.push({
                            label: it.name,
                            value: it.adcode
                        });
                    });
                }
            }).catch((error) => {
                console.log(error);
            })
        },

        getCities() {
            this.cities = [];
            if (this.selfResult.province) {
                getCitiesByProvince(this.selfResult.province).then((response) => {
                    if (isArray(response.data.result)) {
                        response.data.result.forEach((it) => {
                            this.cities.push({
                                label: it.name,
                                value: it.adcode
                            });
                        });
                        if (this.cities.length == 0) {
                            this.cities.push(emptyOption);
                            this.areas.push(emptyOption);
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        },

        getAreas() {
            this.areas = [];
            if (this.selfResult.city) {
                getAreasByCity(this.selfResult.city).then((response) => {
                    if (isArray(response.data.result)) {
                        response.data.result.forEach((it) => {
                            this.areas.push({
                                label: it.name,
                                value: it.adcode
                            });
                        });
                        if (this.areas.length == 0) {
                            this.areas.push(emptyOption);
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    },
    computed: {},
    watch:{
        result: {
            handler: function(newVal) {
                this.selfResult = newVal;
            },
            deep: true
        },
        selfResult: {
            handler: function(newVal) {
                this.$emit('change', newVal);
            },
            deep: true
        }
    }
}

</script>

<style>
</style>
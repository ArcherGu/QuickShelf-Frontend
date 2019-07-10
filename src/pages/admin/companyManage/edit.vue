<template>
    <div>
        <dist-picker v-model="address"></dist-picker>
    </div>
</template>

<script>
import DistPicker from "@/components/DistPicker";
import { getCompanyInfo } from "@/api/admin/company.js";

export default {
    name: 'CompanyEdit',
    components: {
        DistPicker
    },
    data() {
        return {
            boss: {},
            address: {
                province: 330000,
                city: 330200,
                district: 330281
            }
        };
    },
    created() {
        getCompanyInfo(this.$route.query.id).then(response => {
            //console.log(response.data.result);
        });
    },
    mounted() {

    },
    methods: {

    },
    computed: {

    },
    watch: {
        address: {
            handler: function(newVal) {
                console.log(newVal);
            },
            deep: true
        },
    }
}
</script>
<template>
    <div>

    </div>
</template>

<script>
import { getCompanyInfo } from "@/api/admin/company_manage.js";

export default {
    name: 'CompanyEdit',
    components: {

    },
    data() {
        return {
            boss: {}
        };
    },
    created() {
        getCompanyInfo(this.$route.query.id).then(response => {
            console.log(response.data.result);
        });
    },
    mounted() {

    },
    methods: {

    },
    computed: {

    }
}
</script>
<template>
    <div>
        <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-6">
                <company-edit-form :company-id="companyId" />
            </div>
            <div class="col-xs-12 col-sm-6">
                <boss-edit-form />
            </div>
        </div>
    </div>
</template>

<script>
import CompanyEditForm from "./components/CompanyEditForm";
import BossEditForm from "./components/BossEditForm";

export default {
    name: 'CompanyEdit',
    components: {
        CompanyEditForm,
        BossEditForm,
    },
    data() {
        return {
            companyId: this.$route.params.company_id,
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
}
</script>
<style>
</style>

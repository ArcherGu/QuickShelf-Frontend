<template>
    <div>
        <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-6">
                <company-edit-form :company-id="companyId" style="height: 100%"></company-edit-form>
            </div>
            <div class="col-xs-12 col-sm-6">
                <boss-edit-form :boss-id="bossId" style="height: 100%"></boss-edit-form>
            </div>
        </div>
    </div>
</template>

<script>
import CompanyEditForm from "./components/CompanyEditForm.vue";
import BossEditForm from "./components/BossEditForm.vue";

export default {
    name: 'CompanyEdit',
    components: {
        CompanyEditForm,
        BossEditForm,
    },
    data() {
        return {
            companyId: this.$route.params.company_id,
            bossId: "0",
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

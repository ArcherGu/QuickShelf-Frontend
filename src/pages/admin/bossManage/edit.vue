<template>
    <div>
        {{ boss }}
    </div>
</template>

<script>
import { getAllBosses } from "@/api/admin/company_manage.js";

export default {
    name: 'BossEdit',
    components: {

    },
    data() {
        return {
            boss: {}
        };
    },
    created() {
        getProduct(this.$route.query.id).then(response => {
            this.productParam = response.data;
        });
    },
    mounted() {
        this.getBossData();
    },
    methods: {
        getBossData() {

        }
    },
    computed: {

    }
}
</script>
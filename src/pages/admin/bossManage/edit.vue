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
    mounted(){
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
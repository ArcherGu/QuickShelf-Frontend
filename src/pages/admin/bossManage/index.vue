<template>
    <div>
        <q-toolbar class="q-mt-md bg-white text-black shadow-1 rounded-borders">
            <q-icon name="insert_chart_outlined" size="24px"/>
            <q-toolbar-title>
                <span v-text="$t('common.dataTable')"></span>
            </q-toolbar-title>
            <q-btn 
                flat 
                round 
                dense 
                icon="add"
                @click="showDialog = true" 
            />
        </q-toolbar>

        <boss-add-dialog 
            v-model="showDialog"
        />
    </div>
</template>

<script>
import BossAddDialog from "./components/BossAddDialog.vue";

export default {
    name: 'BossManage',
    components: {
        BossAddDialog
    },
    data() {
        return {
            showDialog: false,
        };
    },
    mounted(){

    },
    methods: {

    },
    computed: {

    }
}
</script>
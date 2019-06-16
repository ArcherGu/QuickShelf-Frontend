<template>
    <div>
        <q-toolbar class="bg-white text-black shadow-1 rounded-borders">
            <q-btn flat round dense icon="menu" />
            <q-toolbar-title>
                <span v-text="$t('common.dataTable')"></span>
            </q-toolbar-title>
            <q-btn 
                flat 
                round 
                dense 
                icon="add"
                @click="showAddDialog(false)" 
            />
        </q-toolbar>

        <q-card class="q-mt-md">
            <q-table
                :data="table.data"
                :columns="table.columns"
                row-key="id"
                separator="cell"
            >
                <template v-slot:body-cell-id="props">
                    <q-td auto-width :props="props">
                        <q-btn
                            color="primary"
                            size="xs"
                            :label="$t('operate.edit')"
                            @click="showAddDialog(props.row)"
                        />
                    </q-td>
                </template>
            </q-table>
        </q-card>
        <router-edit-dialog 
            v-model="showAdd"
            :source-data="routerData"
            :all-routers="table.data"
            @refresh-table="getRoutersData"
            @clean-data="routerData = false"
        />
    </div>
</template>

<script>
import RouterEditDialog from "@/components/admin/RouterEditDialog.vue";
import { getAllRouters } from "@/api/admin/routerManage.js";
import { isArray } from "@/utils/tools.js";

export default {
    name: 'AdminPages',
    components: {
        RouterEditDialog
    },
    data() {
        return {
            showAdd: false,
            table: {
                columns:[
                    {
                        name: 'name',
                        required: true,
                        label: this.$t('admin.router.name'),
                        align: 'left',
                        field: row => row.name,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'path',
                        required: true,
                        label: this.$t('admin.router.path'),
                        align: 'left',
                        field: row => row.path,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'component',
                        required: true,
                        label: this.$t('admin.router.component'),
                        align: 'left',
                        field: row => row.component,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'roleNames',
                        required: true,
                        label: this.$t('admin.router.role'),
                        align: 'left',
                        field: row => row.roleNames.length > 0 ? row.roleNames[0] : 'none',
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'icon',
                        required: true,
                        label: this.$t('admin.router.icon'),
                        align: 'left',
                        field: row => row.icon,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'level',
                        required: true,
                        label: this.$t('admin.router.level'),
                        align: 'left',
                        field: row => row.level,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'belong_to',
                        required: true,
                        label: this.$t('admin.router.belongTo'),
                        align: 'left',
                        field: row => row.belong_to,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'is_lock',
                        required: true,
                        label: this.$t('admin.router.isLock'),
                        align: 'left',
                        field: row => row.is_lock,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'is_menu',
                        required: true,
                        label: this.$t('admin.router.isMenu'),
                        align: 'left',
                        field: row => row.is_menu,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'is_use',
                        required: true,
                        label: this.$t('admin.router.isUse'),
                        align: 'left',
                        field: row => row.is_use,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'id',
                        required: true,
                        label: this.$t('operate.self'),
                        align: 'center',
                        field: row => row.is_use,
                        format: val => `${val}`,
                        sortable: true
                    },
                ],
                data:[]
            },
            routerData: false,
        };
    },
    mounted(){
        this.getRoutersData();
    },
    methods: {
        showAddDialog(row){
            this.routerData = row;
            this.showAdd = true;
        },

        getRoutersData() {
            getAllRouters().then((response) => {
                if (isArray(response.data.result)) {
                    this.table.data = response.data.result;
                }
            });
        },
    },
    computed: {

    }
}
</script>
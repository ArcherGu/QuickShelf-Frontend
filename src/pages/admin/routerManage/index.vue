<template>
    <div>
        <q-toolbar class="bg-white text-black shadow-1 rounded-borders">
            <q-icon name="insert_chart_outlined" size="24px"/>
            <q-toolbar-title>
                <span v-text="$t('common.dataTable')"></span>
            </q-toolbar-title>
            <q-btn 
                flat 
                round 
                dense 
                icon="add"
                @click="showAddEditDialog(false)" 
            />
        </q-toolbar>

        <q-card class="q-mt-md">
            <q-table
                :data="table.data"
                :columns="table.columns"
                :pagination.sync="table.pagination"
                row-key="id"
                separator="cell"
            >
                <template v-slot:body-cell-operate="props">
                    <q-td auto-width :props="props">
                        <q-btn
                            class="q-mr-md"
                            color="primary"
                            size="xs"
                            :label="$t('operate.edit')"
                            @click="showAddEditDialog(props.row)"
                        />
                    </q-td>
                </template>
            </q-table>
        </q-card>
        <router-edit-dialog 
            v-model="showDialog"
            :source-data="routerData"
            :all-routers="table.data"
            @refresh-table="getRoutersData"
        />
    </div>
</template>

<script>
import RouterEditDialog from "./components/RouterEditDialog.vue";
import { getAllRouters } from "@/api/admin/router_manage.js";
import { isArray } from "@/utils";

export default {
    name: 'RouterManage',
    components: {
        RouterEditDialog
    },
    data() {
        return {
            showDialog: false,
            table: {
                pagination: {
                    sortBy: 'sort',
                    descending: false,
                    page: 1,
                    rowsPerPage: 20
                    // rowsNumber: xx if getting data from a server
                },
                columns:[
                    {
                        name: 'name',
                        label: this.$t('admin.router.name'),
                        align: 'left',
                        field: row => row.name,
                        sortable: true
                    },
                    {
                        name: 'title',
                        label: this.$t('admin.router.title'),
                        align: 'left',
                        field: row => row.title,
                        sortable: true
                    },
                    {
                        name: 'path',
                        label: this.$t('admin.router.path'),
                        align: 'left',
                        field: row => row.path,
                        sortable: true
                    },
                    {
                        name: 'redirect',
                        label: this.$t('admin.router.redirect'),
                        align: 'left',
                        field: row => row.redirect,
                        format: val => val? `${val}`: this.$t('common.none'),
                        sortable: true
                    },
                    {
                        name: 'component',
                        label: this.$t('admin.router.component'),
                        align: 'left',
                        field: row => row.component,
                        sortable: true
                    },
                    {
                        name: 'roleNames',
                        label: this.$t('admin.router.roleNames'),
                        align: 'left',
                        field: row => row.roleNames,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'icon',
                        label: this.$t('admin.router.icon'),
                        align: 'left',
                        field: row => row.icon,
                        sortable: true
                    },
                    {
                        name: 'sort',
                        label: this.$t('admin.router.sort'),
                        align: 'left',
                        field: row => row.sort,
                        sortable: true
                    },
                    {
                        name: 'belong_to',
                        label: this.$t('admin.router.belongTo'),
                        align: 'left',
                        field: row => row.belong_to,
                        sortable: true
                    },
                    {
                        name: 'is_lock',
                        label: this.$t('admin.router.isLock'),
                        align: 'left',
                        field: row => row.is_lock,
                        sortable: true
                    },
                    {
                        name: 'is_menu',
                        label: this.$t('admin.router.isMenu'),
                        align: 'left',
                        field: row => row.is_menu,
                        sortable: true
                    },
                    {
                        name: 'is_use',
                        label: this.$t('admin.router.isUse'),
                        align: 'left',
                        field: row => row.is_use,
                        sortable: true
                    },
                    {
                        name: 'operate',
                        label: this.$t('operate.self'),
                        align: 'center',
                        sortable: false
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
        showAddEditDialog(row){
            this.routerData = row;
            this.showDialog = true;
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
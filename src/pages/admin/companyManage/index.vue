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
                            :label="$t('operate.detail')"
                            @click="goEditPage(props.row)"
                        />
                    </q-td>
                </template>
            </q-table>
        </q-card>

        <company-add-dialog 
            v-model="showDialog"
            @refresh-table="getCompaniesData"
        />
    </div>
</template>

<script>
import CompanyAddDialog from "./components/CompanyAddDialog";
import { getAllCompanies } from "@/api/company";
import { isArray } from "@/utils";

export default {
    name: 'CompanyManage',
    components: {
        CompanyAddDialog
    },
    data() {
        return {
            showDialog: false,
            table: {
                pagination: {
                    sortBy: 'id',
                    descending: false,
                    page: 1,
                    rowsPerPage: 20
                },
                columns:[
                    {
                        name: 'name',
                        label: this.$t('company.self'),
                        align: 'left',
                        field: row => row.name + `${row.is_use? '' : '(被冻结)'}`,
                        sortable: true
                    },
                    {
                        name: 'currentShopNum',
                        label: this.$t('shop.self') + this.$t('common.amount'),
                        align: 'left',
                        field: row => `${row.currentShopNum}/${row.max_shop_num}`,
                        sortable: true
                    },
                    {
                        name: 'bossName',
                        label: this.$t('role.boss'),
                        align: 'left',
                        field: row => row.bossName,
                        sortable: true
                    },
                    {
                        name: 'phone_number',
                        label: this.$t('auth.phone_number'),
                        align: 'left',
                        field: row => row.phone_number,
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
        };
    },
    mounted(){
        this.getCompaniesData();
    },
    methods: {
        getCompaniesData() {
            getAllCompanies().then((response) => {
                if (isArray(response.data.result)) {
                    this.table.data = response.data.result;
                }
            });
        },
        goEditPage(row) {
            //this.$router.push({path:'/admin/company/edit', query:{ id: row.id }});
            this.$router.push({ path:`/admin/company/edit/${row.id }` });
        }
    },
    computed: {

    }
}
</script>
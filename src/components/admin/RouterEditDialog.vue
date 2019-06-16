<template>
    <q-dialog 
        v-model="myShow" 
        ref="addDialog" 
        @before-show="changeDetails"
        @hide="cleanData"
    >
        <q-card style="width: 500px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6" v-text="details.title"></div>
            </q-card-section>

            <q-card-section>
                <q-input 
                    v-model="editData.path" 
                    :label="$t('admin.router.path')" 
                />
                <q-input 
                    v-model="editData.name" 
                    :label="$t('admin.router.name')" 
                />
                <q-input 
                    v-model="editData.component" 
                    :label="$t('admin.router.component')" 
                />
                <q-input 
                    v-model="editData.icon" 
                    :label="$t('admin.router.icon')" 
                />
                <q-input 
                    v-model="editData.level" 
                    :label="$t('admin.router.level')" 
                />
                <q-select
                    v-model="editData.belongTo"
                    :label="$t('admin.router.belongTo')"
                    :options="selectRouters"
                    emit-value
                    map-options
                />
                <q-select 
                    v-model="editData.role" 
                    :options="roles" 
                    :option-value="(item) => item"
                    :option-label="(item) => $t('role.' + item)"
                    emit-value
                    map-options
                    :label="$t('admin.router.role')" 
                />

                <q-toggle
                    v-model="editData.isLock"
                    checked-icon="lock"
                    unchecked-icon="lock_open"
                    color="green"
                    left-label
                    :label="$t('admin.router.isLock')"
                    :true-value="1"
                    :false-value="0"
                />

                <q-toggle
                    v-model="editData.isMenu"
                    checked-icon="event_available"
                    unchecked-icon="event_busy"
                    color="primary"
                    left-label
                    :label="$t('admin.router.isMenu')"
                    :true-value="1"
                    :false-value="0"
                />

                <q-toggle
                    v-model="editData.isUse"
                    checked-icon="check"
                    unchecked-icon="clear"
                    color="info"
                    left-label
                    :label="$t('admin.router.isUse')"
                    :true-value="1"
                    :false-value="0"
                />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    :label="details.saveBtn.text"
                    :color="details.saveBtn.color"
                    @click="test"
                />
                <q-btn
                    :label="$t('operate.cancel')"
                    color="grey-7"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { addOrEditRouter } from "@/api/admin/routerManage.js";
import { getAllRoles } from "@/api/role.js";
import { required, numeric } from "vuelidate/lib/validators";

export default {
    name: 'router-edit-dialog',
    props: {
        show:{
            type: Boolean,
            default: false
        },
        allRouters:{
            type: Array
        },
        sourceData: {
            type: [Object, Boolean],
            default: false
        }
    },
    data(){
        return {
            myShow: this.show,
            roles:['none'],
            details:{
                title: this.$t('operate.add') + this.$t('admin.router.self'),
                saveBtn: {
                    color: 'positive',
                    text: this.$t('operate.add')
                }
            }
        }
    },
    model: {
        prop: 'show',
        event: 'show-dialog'
    },
    mounted(){
        this.getRolesData();
    },
    methods: {
        save(){
            addOrEditRouter(this.editData).then((response) => {
                this.$refs.addDialog.hide();
                this.$emit('refresh-table');
            }).catch((error) => {
                console.log(error);
            })
        },

        test() {
            console.log(this.editData);
            this.$v.editData.$touch();
            console.log(this.$v.editData.$error)
        },

        getRolesData() {
            getAllRoles().then((response) => {
                response.data.result.forEach(role => {
                    this.roles.push(role);
                });
            });
        },

        changeDetails() {
            if (this.editData.id > 0) {
                this.details.title = this.$t('operate.edit') + this.$t('admin.router.self');
                this.details.saveBtn.text = this.$t('operate.confirm');
                this.details.saveBtn.color = 'primary'
            }
            else {
                this.details.title = this.$t('operate.add') + this.$t('admin.router.self');
                this.details.saveBtn.text = this.$t('operate.add');
                this.details.saveBtn.color = 'positive'
            }
        },

        cleanData() {
            this.$emit('clean-data');
        }
    },
    computed: {
        editData() {
            if (this.sourceData) {
                return {
                    id: parseInt(this.sourceData.id),
                    path: this.sourceData.path,
                    name: this.sourceData.name,
                    component: this.sourceData.component,
                    icon: this.sourceData.icon,
                    level: parseInt(this.sourceData.level),
                    belongTo: parseInt(this.sourceData.belong_to),
                    role: this.sourceData.roleNames.length > 0 ? this.sourceData.roleNames[0] : 'none',
                    isLock: parseInt(this.sourceData.is_lock),
                    isMenu: parseInt(this.sourceData.is_menu),
                    isUse: parseInt(this.sourceData.is_use),
                };
            }
            else {
                return {
                        id: 0,
                        path: '',
                        name: '',
                        component: '',
                        icon: '',
                        level: '',
                        belongTo: 0,
                        role: 'none',
                        isLock: 0,
                        isMenu: 0,
                        isUse: 1,
                };
            }
        },
        selectRouters() {
            let selectData = [{
                label: 'none',
                value: 0
            }];
            this.allRouters.forEach((it) =>{
                selectData.push({
                    label: `${it.name} (${it.path})`,
                    value: it.id
                });
            });
            return selectData;
        },
    },
    watch:{
        show(newVal) {
            this.myShow = newVal;
        },
        myShow(newVal) {
            this.$emit('show-dialog', newVal)
        }
    },
    validations: {
        editData: {
            id: { required, numeric },
            path: { required },
            name: { required },
            component: { required },
            icon: { required },
            level: { required, numeric },
            belongTo: { required, numeric },
            role: { required },
            isLock: { required, numeric },
            isMenu: { required, numeric },
            isUse: { required, numeric },
        }
    }
}
</script>
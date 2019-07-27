<template>

    <q-dialog
        v-model="myShow"
        ref="addEditDialog"
        @before-show="changeDetails"
    >

        <q-card style="width: 500px; max-width: 80vw;">
            <q-form @submit="save">
                <q-card-section>
                    <span
                        class="text-h6"
                        v-text="details.title"
                    >
                    </span>
                </q-card-section>

                <q-card-section>
                    <q-input
                        v-model="editData.path"
                        :label="$t('admin.router.path')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('admin.router.path') })]"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="editData.name"
                        :label="$t('admin.router.name')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('admin.router.name') })]"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="editData.redirect"
                        :label="$t('admin.router.redirect')"
                        :rules="[]"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="editData.component"
                        :label="$t('admin.router.component')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('admin.router.component') })]"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="editData.title"
                        :label="$t('admin.router.title')"
                        :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('admin.router.title') })]"
                        outlined
                        dense
                    />
                    <q-input
                        v-model="editData.icon"
                        :label="$t('admin.router.icon')"
                        outlined
                        dense
                    />

                    <q-select
                        class="q-mt-md"
                        emit-value
                        map-options
                        multiple
                        outlined
                        dense
                        v-model="editData.roleNames"
                        :options="roles"
                        :option-value="(item) => item"
                        :option-label="(item) => $t('role.' + item)"
                        :option-disable="(item) => disableRoles.includes(item)"
                        :label="$t('admin.router.roleNames')"
                        :rules="[ val => val && val.length > 0 || $t('errors.select_required', { item: $t('admin.router.roleNames') })]"
                    />
                    <q-select
                        v-model="editData.belong_to"
                        emit-value
                        map-options
                        outlined
                        dense
                        @input="setLimit"
                        :label="$t('admin.router.belongTo')"
                        :options="selectRouters"
                    />
                    <div class="q-mt-md">
                        <span v-text="$t('admin.router.sort')"></span>
                        <div class="q-px-lg">
                            <q-slider
                                class="q-ml-lg"
                                v-model="editData.sort"
                                :min="0"
                                :max="20"
                                :step="1"
                                label
                                label-always
                                color="light-green"
                            />
                        </div>
                    </div>
                    <q-toggle
                        v-model="editData.is_lock"
                        checked-icon="lock"
                        unchecked-icon="lock_open"
                        color="green"
                        left-label
                        :label="$t('admin.router.isLock')"
                        :true-value="1"
                        :false-value="0"
                    />

                    <q-toggle
                        v-model="editData.is_menu"
                        checked-icon="event_available"
                        unchecked-icon="event_busy"
                        color="primary"
                        left-label
                        :label="$t('admin.router.isMenu')"
                        :true-value="1"
                        :false-value="0"
                    />

                    <q-toggle
                        v-model="editData.is_use"
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
                        type="submit"
                        :label="details.saveBtn.text"
                        :color="details.saveBtn.color"
                    />
                    <q-btn
                        type="reset"
                        :label="$t('operate.cancel')"
                        color="grey-7"
                        v-close-popup
                    />
                </q-card-actions>
            </q-form>
        </q-card>

    </q-dialog>

</template>

<script>
import { saveRouter } from "@/api/routers";
import { getAllRoles } from "@/api/role";
import { DEF_ROUTE_DATA, DEF_ROUTE_SELECT_OPTION } from "@/data/default";

export default {
    name: 'RouterEditDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        allRouters: {
            type: Array
        },
        sourceData: {
            type: [Object, Boolean],
            default: false
        }
    },
    data() {
        return {
            myShow: this.show,
            roles: [],
            disableRoles: [],
            editData: { ...DEF_ROUTE_DATA },
            details: {
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
    mounted() {
        this.getRolesData();
    },
    methods: {
        save() {
            saveRouter(this.editData).then((response) => {
                this.$refs.addEditDialog.hide();
                this.editData = { ...DEF_ROUTE_DATA };
                this.$emit('refresh-table');
            }).catch((error) => {
                if (error.response) {
                    this.$q.dialog({
                        message: this.$t(error.response.data.result)
                    });
                }
            })
        },

        getRolesData() {
            getAllRoles().then((response) => {
                response.data.result.forEach(role => {
                    this.roles.push(role);
                });
            });
        },

        setLimit() {
            let fatherRouter = this.selectRouters.filter( it => it.value == this.editData.belong_to);
            if (fatherRouter && fatherRouter.length > 0) {
                fatherRouter = fatherRouter[0];
                if (fatherRouter.label == 'none') {
                    this.disableRoles = [];
                }
                else {
                    this.editData.roleNames = fatherRouter.roleNames;
                    this.disableRoles = this.roles.filter((it) => !fatherRouter.roleNames.includes(it));
                }
            }
        },

        changeDetails() {
            if (this.editData.id != null) {
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
    },
    computed: {
        selectRouters() {
            let selectData = [{ ...DEF_ROUTE_SELECT_OPTION }];
            this.allRouters.forEach((it) => {
                selectData.push({
                    label: `${it.name} (${it.path})`,
                    value: it.id,
                    roleNames: it.roleNames.length > 0 ? it.roleNames : ['admin']
                });
            });
            return selectData;
        }
    },
    watch: {
        sourceData(newVal) {
            if (newVal) {
                this.editData = {
                    id: parseInt(newVal.id),
                    path: newVal.path,
                    name: newVal.name,
                    redirect: newVal.redirect,
                    title: newVal.title,
                    component: newVal.component,
                    icon: newVal.icon,
                    sort: parseInt(newVal.sort),
                    belong_to: parseInt(newVal.belong_to),
                    roleNames: newVal.roleNames.length > 0 ? newVal.roleNames : ['admin'],
                    is_lock: parseInt(newVal.is_lock),
                    is_menu: parseInt(newVal.is_menu),
                    is_use: parseInt(newVal.is_use),
                };
            }
            else {
                this.editData = { ...DEF_ROUTE_DATA };
            }
            this.setLimit();
        },
        show(newVal) {
            this.myShow = newVal;
        },
        myShow(newVal) {
            this.$emit('show-dialog', newVal)
        }
    },
}
</script>
<template>
    <div>
        <q-form @submit="save" ref="routeForm">
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
            </q-card-actions>
        </q-form>
    </div>
</template>

<script>
import { saveRouter } from "@/api/routers";
import { getAllRoles } from "@/api/role";
import { DEF_ROUTE_DATA, DEF_ROUTE_SELECT_OPTION } from "@/data/default";

export default {
    name: 'RouterEdit',
    components: {},
    props: {},
    data() { 
        return {
            roles: [],
            rootRoutes: [],
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
    created() {
        this.$bus.$on('root-routes-change', this.rootRoutesChangeEvent);
        this.$bus.$on('select-route-change', this.selectRouteChangeEvent);
    },
    mounted() { 
        this.getRolesData();
    },
    beforeDestroy() {
        this.$bus.$off('root-routes-change');
        this.$bus.$off('select-route-change');
    },
    methods: {
        rootRoutesChangeEvent(routes) {
            this.rootRoutes = routes;
        },

        selectRouteChangeEvent(route) {
            console.log(route);
            this.editData = route? route : { ...DEF_ROUTE_DATA };
            this.setLimit();
            this.changeDetails();
            this.$nextTick(() => {
                this.$refs.routeForm.resetValidation();
            });
        },

        save() {
            saveRouter(this.editData).then((response) => {
                this.$bus.$emit('refresh-tree');
                this.$q.notify(
                    this.$t('state.op_success',{ operate: this.$t('operate.save') })
                );
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
        }
    },
    computed: {
        selectRouters() {
            let selectData = [{ ...DEF_ROUTE_SELECT_OPTION }];
            this.rootRoutes.forEach((it) => {
                selectData.push({
                    label: `${it.name} (${it.path})`,
                    value: it.id,
                    roleNames: it.roleNames.length > 0 ? it.roleNames : ['admin']
                });
            });
            return selectData;
        }
    }
}

</script>

<style>
</style>
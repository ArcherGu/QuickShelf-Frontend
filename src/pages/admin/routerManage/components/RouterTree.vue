<template>
    <div class="q-pa-sm">
        <q-toolbar class="q-mb-sm">
            <q-icon
                name="insert_chart_outlined"
                size="24px"
            />
            <q-toolbar-title>
                <span v-text="$t('admin.router.self')"></span>
            </q-toolbar-title>
            <q-btn
                icon="add"
                color="positive"
                size="xs"
                :label="$t('operate.add') + $t('admin.router.self')"
                @click="addRoute"
            />
        </q-toolbar>
        <q-separator class="q-mb-sm" />
        <q-tree
            ref="routesTree"
            selected-color="blue"
            node-key="id"
            :nodes="routersTree"
            :selected.sync="selectedKey"
            @update:selected="nodeChange"
        >
            <template v-slot:default-header="prop">
                <q-icon
                    :name="prop.node.icon || 'bookmark_border'"
                    size="20px"
                    class="q-mr-sm"
                />
                <span class="text-weight-bold q-mr-sm">{{ $t(`router.${prop.node.title}`) }}</span>
            </template>
        </q-tree>
    </div>
</template>

<script>
import { getAllRoutersTree } from "@/api/routers";
import { DEF_ROUTE_DATA } from "@/data/default";
import { isArray } from "@/utils";


export default {
    name: 'RouterTree',
    components: {},
    props: {},
    data() {
        return {
            routersTree: [],
            selectedKey: null,
            selectedNode: { ...DEF_ROUTE_DATA }
        }
    },
    created() {
        this.$bus.$on('refresh-tree', this.getRoutersData);
    },
    mounted() {
        this.getRoutersData();
    },
    beforeDestroy() {
        this.$bus.$off('refresh-tree');
    },
    methods: {
        getRoutersData() {
            getAllRoutersTree().then((response) => {
                if (isArray(response.data.result)) {
                    this.routersTree = response.data.result;
                    this.$bus.$emit('root-routes-change', this.routersTree);
                }
            });
        },

        nodeChange(key) {
            this.$bus.$emit('select-route-change', this.$refs.routesTree.getNodeByKey(key));
        },

        addRoute() {
            this.selectedKey = null;
            this.$bus.$emit('select-route-change', null);
        }
    },
    computed: {},
}

</script>

<style>
</style>
<template>
    <q-scroll-area>
        <q-list padding v-for="(trunk, index) in menuData" :key="index">
            <template v-for="(child, childKey) in trunk">
                <sidebar-item :branchs="child" :key="childKey">
                </sidebar-item>
            </template>
        </q-list>
        <q-separator inset v-if="menuData.length > 0" />
    </q-scroll-area>
</template>

<script>
import SidebarItem from './SidebarItem';

export default {
    components: { SidebarItem },
    data() {
        return {
            menuData: []
        }
    },
    created() {
        if (this.$store.getters['auth/gotRouters']) {
            let rawData = JSON.parse(JSON.stringify(this.$store.getters['auth/myRouters']));
            this.menuData = this.formateMenu(rawData);
            console.log(this.menuData);
        }
    },
    methods: {
        formateMenu(data) {
            data.forEach(route => {
                if (route.children && route.children.length) {
                    route.children = this.getTree(route.children, route.path);
                }
            });
            return data;
        },

        getTree(asyncRouterMap, prefix) {
            const tree = asyncRouterMap.filter(route => {
                if (route.meta.menu) {
                    route.path = `${prefix}${route.path == ''? '' : '/'}${route.path}`;
                    if (route.children && route.children.length) {
                        route.children = this.getTree(route.children, route.path)
                    }
                    return true;
                }

                return false;
            })

            return tree
        }
    }
}
</script>
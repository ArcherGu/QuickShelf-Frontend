<template>
    <q-scroll-area style="height: calc(100% - 70px); margin-top: 70px; border-right: 1px solid #ddd">
        <q-list padding>
            <sidebar-item :routes="routes">
            </sidebar-item>
        </q-list>
    </q-scroll-area>
</template>

<script>
import SidebarItem from './SidebarItem';

export default {
    components: { SidebarItem },
    computed: {
        routes() {
            //console.log(this.$router.options.routes);
            console.log(this.$router.options.routes);
            return this.$router.options.routes;
        },
    }
}
</script>
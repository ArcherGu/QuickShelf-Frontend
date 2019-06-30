<template>
    <div>
        <template
            v-for="item in routes"
            v-if="item.meta.menu"
        >
            <q-item
                v-if="hasOneShowingChildren(item.children) && (!item.children[0].children || item.children[0].children.length === 0)"
                :to="fatherPath + item.path+'/'+item.children[0].path"
                :key="item.children[0].name"
                clickable
                v-ripple
                exact
                class="custom-pl"
            >
                <q-item-section avatar>
                    <q-icon :name="item.children[0].meta.icon" />
                </q-item-section>

                <q-item-section>
                    <q-item-label v-text="item.children[0].meta.title"></q-item-label>
                </q-item-section>
            </q-item>

            <template v-else>
                <q-expansion-item
                    :icon="item.meta.icon"
                    :label="item.meta.title"
                    :content-inset-level="0.5"
                    class="custom-pl"
                >
                    <template
                        v-for="child in item.children"
                        v-if="child.meta.menu"
                    >
                        <sidebar-item
                            v-if="child.children&&child.children.length>0"
                            :routes="[child]"
                            :father-path="item.path + '/'"
                        >
                        </sidebar-item>

                        <q-item
                            v-else
                            :to="fatherPath + item.path+'/'+child.path"
                            :key="child.name"
                            clickable
                            v-ripple
                            exact
                        >
                            <q-item-section avatar>
                                <q-icon :name="child.meta.icon"/>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label v-text="child.meta.title"></q-item-label>
                            </q-item-section>
                        </q-item>

                    </template>
                </q-expansion-item>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        },
        fatherPath: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        hasOneShowingChildren(children) {
            const showingChildren = children.filter(item => {
                return item.meta.menu;
            })
            if (showingChildren.length === 1) {
                return true
            }
            return false
        }
    },
    computed: {

    },
    watch: {

    },
}
</script>

<style scoped>
    .custom-pl .q-item__section--avatar{
        padding-left: 11.5px;
    }
</style>

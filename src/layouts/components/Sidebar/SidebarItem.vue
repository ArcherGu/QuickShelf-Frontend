<template>
    <div>
        <template v-for="(item, index) in branchs">
            
        </template>
        <q-expansion-item

            icon="meta."
            label="Index" 
            clickable
            v-ripple
            exact
            to="/"
        >

        </q-expansion-item>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        branchs: {
            type: Array
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
}
</script>
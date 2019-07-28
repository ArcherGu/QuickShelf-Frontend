<template>
    <div>
        <q-card>
            <q-card-section>
                <q-splitter
                    v-model="splitter"
                    :limits="[25, 50]"
                >
                    <template v-slot:before>
                        <router-tree />
                    </template>

                    <template v-slot:after>
                        <router-edit />
                    </template>
                </q-splitter>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import RouterEditDialog from "./components/RouterEditDialog";
import RouterEdit from "./components/RouterEdit";
import RouterTree from "./components/RouterTree";

export default {
    name: 'RouterManage',
    components: {
        RouterEditDialog,
        RouterEdit,
        RouterTree
    },
    data() {
        return {
            showDialog: false,
            splitter: 30,
            allData: [],
            routerData: false,
        };
    },
    mounted() {

    },
    methods: {
        showAddEditDialog(data) {
            this.routerData = data;
            this.showDialog = true;
        }
    },
    computed: {

    }
}
</script>
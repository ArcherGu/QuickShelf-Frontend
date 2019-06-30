<template>
    <q-layout view="lHh Lpr lff" class="bg-brown-1">
        <q-header
            :reveal="true"
            bordered
            class="bg-brown-1"
        >
            <q-toolbar style="height: 70px;">
                <q-btn
                    flat
                    @click="showMenu = !showMenu"
                    round
                    dense
                    color="grey-7"
                    icon="menu"
                />
                <q-toolbar-title class="text-grey-7 text-weight-bold">Header</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="showMenu"
            :width="250"
            :breakpoint="400"
            show-if-above
        >
            <sidebar></sidebar>

            <div
                class="absolute-top"
                style="height: 70px; border-right: 1px solid #ddd"
            >
                <div style="height: 70px">
                    <q-avatar
                        size="45px"
                        class="q-mb-sm"
                    >
                        <img src="~assets/quickshelf.png" />
                    </q-avatar>
                    <span class="text-weight-bold">QuickShelf</span>
                    <span>@{{$auth.user().username}}</span>
                </div>
                <q-separator inset />
            </div>
        </q-drawer>

        <q-page-container>
            <div class="app-container">
                <router-view />
            </div>
        </q-page-container>
    </q-layout>

</template>

<script>
import { Sidebar } from './components';

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            showMenu: true
        }
    }
}
</script>

<style scoped>
    .app-container {
        padding: 20px;
    }
</style>

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
                    class="sidebar-mini-btn"
                    @click="miniMenu = !miniMenu"
                    round
                    dense
                    color="grey-7"
                    icon="menu"
                />
                <q-btn
                    flat
                    class="sidebar-show-btn"
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
            :width="260"
            :mini-width="80"
            :breakpoint="1023"
            :mini="miniMenu"
            @click.capture="drawerClick"
            show-if-above
        >
            <sidebar></sidebar>

            <div
                class="absolute-top"
                style="height: 70px; border-right: 1px solid #ddd"
            >
                <div class="logo q-ml-auto q-mr-auto">
                    <q-avatar
                        class="logo-img"
                    >
                        <img src="~assets/quickshelf.png" />
                    </q-avatar>
                    <span class="text-weight-bold q-mini-drawer-hide">QuickShelf</span>
                </div>

                <q-separator inset />
            </div>
        </q-drawer>

        <q-page-container>
            <div class="app-container">
                <transition name="fade" mode="out-in">
                    <router-view />
                </transition>
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
            showMenu: true,
            miniMenu: true,
        }
    },
    methods: {
        drawerClick (e) {
            if (this.miniMenu) {
                this.miniMenu = false

                // notice we have registered an event with capture flag;
                // we need to stop further propagation as this click is
                // intended for switching drawer to "normal" mode only
                e.stopPropagation()
            }
        }
    }
}
</script>

<style scoped>
    .app-container {
        padding: 30px;
    }
    .logo {
        padding: 18px 0;
        margin: 0;
        box-shadow: inset -1px 0 0 0 #cfcfca;
        height: 70px;
        position: relative;
        z-index: 4;
        display: block;
    }
    .logo-img {
        width: 34px;
        display: inline-block;
        height: 34px;
        margin-left: 23px;
        margin-right: 15px;
        background: #fff;
        border-radius: 40px;
        text-align: center;
    }

    @media (max-width: 1023px) {
        .sidebar-show-btn {
            display: inline;
        }
        .sidebar-mini-btn {
            display: none;
        }
    }

    @media (min-width: 1023px) {
        .sidebar-show-btn {
            display: none;
        }
        .sidebar-mini-btn {
            display: inline;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }

    /* .fade-leave-active in <2.1.8 */
    .fade-enter,
    .fade-leave-to
    {
        opacity: 0;
    }
</style>

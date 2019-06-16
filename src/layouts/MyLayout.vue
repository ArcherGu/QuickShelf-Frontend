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
            overlay
        >
            <q-scroll-area style="height: calc(100% - 70px); margin-top: 70px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item
                        clickable
                        v-ripple
                        exact
                        to="/"
                    >
                        <q-item-section avatar>
                            <q-icon name="inbox" />
                        </q-item-section>

                        <q-item-section>
                            Index
                        </q-item-section>
                    </q-item>

                    <q-item
                        clickable
                        v-ripple
                        exact
                        to="/account"
                    >
                        <q-item-section avatar>
                            <q-icon name="star" />
                        </q-item-section>

                        <q-item-section>
                            Account
                        </q-item-section>
                    </q-item>

                    <q-item
                        clickable
                        v-ripple
                        exact
                        to="/shop"
                    >
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            Shop
                        </q-item-section>
                    </q-item>

                    <q-item
                        clickable
                        v-ripple
                        exact
                        to="/admin/router"
                    >
                        <q-item-section avatar>
                            <q-icon name="drafts" />
                        </q-item-section>

                        <q-item-section>
                            Router
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>

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
export default {
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

<template>
    <q-layout view="lHh Lpr lff">
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
                    icon="menu"
                />
                <q-toolbar-title>Header</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="showMenu"
            :width="250"
            :breakpoint="400"
            show-if-above
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
                    >
                        <q-item-section avatar>
                            <q-icon name="drafts" />
                        </q-item-section>

                        <q-item-section>
                            No Now
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>

            <!-- <q-img
                    class="absolute-top"
                    src="https://cdn.quasar.dev/img/material.png"
                    style="height: 150px"
                >
                    <div class="absolute-bottom bg-transparent">
                        <q-avatar
                            size="56px"
                            class="q-mb-sm"
                        >
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                        <div class="text-weight-bold">Razvan Stoenescu</div>
                        <div>@rstoenescu</div>
                    </div>
                </q-img> -->
            <div
                class="absolute-top"
                style="height: 70px; border-right: 1px solid #ddd"
            >
                <div style="height: 70px">
                    <q-avatar
                        size="45px"
                        class="q-mb-sm"
                    >
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        <div class="text-weight-bold">Razvan Stoenescu</div>
                        <div>@rstoenescu</div>
                    </q-avatar>

                </div>
                <q-separator inset />
            </div>
        </q-drawer>

        <q-page-container class="bg-brown-1">
            <router-view />
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
.moving-arrow {
    border-right: 17px solid #f4f3ef;
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
    display: inline-block;
    position: absolute;
    left: 243px;
    top: 95px;
    transition: all .5s cubic-bezier(.29,1.42,.79,1);
}
</style>

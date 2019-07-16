<template>
    <q-card>
        <q-form>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title v-text="$t('role.boss') + $t('common.info')">
                    </q-toolbar-title>
                    <q-btn
                        outline
                        round
                        dense
                        icon="edit"
                        color="primary"
                        v-show="!isEdit"
                        @click="isEdit = true"
                    />
                </q-toolbar>
            </q-card-section>
            <q-card-section class="row">
                <q-list class="col-xs-12 col-sm-12 col-md-7">
                    <q-item class="row">
                        <q-item-section class="col-sm-6 col-md-5">
                            <span class="text-subtitle1 text-weight-bold">
                                <q-icon name="face" />
                                {{$t('auth.name')}}
                            </span>
                        </q-item-section>

                        <q-item-section class="col-sm-6 col-md-7">
                            <span class="text-subtitle1">
                                {{ showData.real_name }}
                                {{ showData.username ? ` (${showData.username})` : ""}}
                            </span>
                        </q-item-section>
                    </q-item>
                    <q-item class="row">
                        <q-item-section class="col-sm-6 col-md-5">
                            <span class="text-subtitle1 text-weight-bold">
                                <q-icon name="local_phone" />
                                {{$t('auth.phone_number')}}
                            </span>
                        </q-item-section>

                        <q-item-section class="col-sm-6 col-md-7">
                            <span class="text-subtitle1">
                                {{ showData.phone_number }}
                            </span>
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-list class="col-xs-12 col-sm-12 col-md-5">
                    <q-item class="row">
                        <q-item-section class="col-sm-6 col-md-5">
                            <span class="text-subtitle1 text-weight-bold">
                                <q-icon :name="showData.is_use? 'check_circle_outline' : 'highlight_off'" />
                                {{$t('state.self')}}
                            </span>
                        </q-item-section>
                        <q-item-section class="col-sm-6 col-md-7">
                            <span :class="['text-subtitle1', 'text-weight-bolder', showData.is_use? 'text-positive' : 'text-red']">
                                {{ showData.is_use? $t('state.enable') : $t('state.disable') }}
                            </span>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="q-mx-md">
                            <q-btn
                                push
                                :label="$t('operate.modify') + $t('auth.password')"
                                color="pink-5"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
            <q-card-actions align="right">

            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script>
import { getUserById, AUTH_TYPE } from "@/api/auth.js";

const defaultUserData = {
    id: 0,
    username: "",
    real_name: "",
    phone_number: "",
    created_at: "",
    email: "",
    is_use: 0,
    roleNames: [],
    shop_id: 0,
    updated_at: "",
};

export default {
    name: 'BossEditForm',
    components: {},
    props: {

    },
    data() { 
        return {
            showData: { ...defaultUserData },
            editData: { ...defaultUserData },
            isEdit: false
        }
    },
    mounted() {
        this.$bus.$on('get-boss-id-from-company', this.getBossInfo);
    },
    beforeDestroy() {
        this.$bus.$off('get-boss-id-from-company', this.getBossInfo);
    },
    methods: {
        getBossInfo(bossId) {
            getUserById(bossId, AUTH_TYPE.BOSS).then((response) => {
                this.showData = { ...response.data.result };
                this.editData = { ...response.data.result };
            })
        }
    },
    computed: {

    },
    watch: {

    }
}

</script>

<style>
</style>
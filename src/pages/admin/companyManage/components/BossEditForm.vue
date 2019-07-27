<template>
    <q-card>
        <q-form @submit="saveBossData">
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
            <q-card-section v-if="isEdit">
                <q-input
                    v-model="editData.real_name"
                    :label="$t('auth.real_name')"
                    :rules="[ val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.real_name') })]"
                    lazy-rules
                    outlined
                    dense
                />
                <q-input
                    v-model="editData.phone_number"
                    :label="$t('auth.phone_number')"
                    :rules="[
                        val => val && val.length > 0 || $t('errors.input_required', { item: $t('auth.phone_number') }),
                        val => verifyPhoneNumber(val) 
                    ]"
                    type="tel"
                    lazy-rules
                    outlined
                    dense
                />
            </q-card-section>
            <q-card-section class="row" v-else>
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
            <q-card-actions v-if="isEdit" align="right">
                <q-btn
                    :label="$t('operate.confirm')"
                    type="submit"
                    color="positive"
                />
                <q-btn
                    :label="$t('operate.cancel')"
                    type="reset"
                    color="grey-7"
                    @click="cancelEdit"
                />
            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script>
import { getUserById, updateUserById } from "@/api/user";
import PwdResetDialog from "@/components/PwdResetDialog";
import { CONST_ROLE_TYPE } from "@/data/const";
import { DEF_USER_DATA } from "@/data/default";
import { verifyPhoneNumber } from "@/utils";

export default {
    name: 'BossEditForm',
    components: {
        PwdResetDialog
    },
    props: {

    },
    data() { 
        return {
            showData: { ...DEF_USER_DATA },
            editData: { ...DEF_USER_DATA },
            isEdit: false
        }
    },
    created() {
        this.$bus.$on('get-boss-id-from-company', this.getBossInfo);
    },
    mounted() {

    },
    beforeDestroy() {
        this.$bus.$off('get-boss-id-from-company', this.getBossInfo);
    },
    methods: {
        getBossInfo(bossId) {
            getUserById(bossId, CONST_ROLE_TYPE.BOSS).then((response) => {
                this.showData = { ...response.data.result };
                this.editData = { ...response.data.result };
            })
        },
        saveBossData() {
            let bossId = this.editData.id;
            updateUserById(bossId, this.editData, CONST_ROLE_TYPE.BOSS).then((response) => {
                this.isEdit = false;
                this.showData = { ...response.data.result };
                this.editData = { ...response.data.result };
            }).catch((error) => {
                if (error.response) {
                    this.$q.dialog({
                        message: this.$t(error.response.data.result)
                    });
                }
            })
        },
        cancelEdit() {
            this.editData = { ...this.showData };
            this.isEdit = false;
        },
        verifyPhoneNumber
    },
    computed: {

    },
    watch: {

    }
}

</script>

<style>
</style>
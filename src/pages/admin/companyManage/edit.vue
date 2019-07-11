<template>
    <div>
        <q-card>
            <div class="row">
                <div class="col">
                    <q-form>
                        <q-card-section>
                            <span
                                class="text-h6"
                                v-text="$t('company.self')"
                            >
                            </span>
                        </q-card-section>

                        <q-card-section>

                        </q-card-section>

                        <q-card-actions align="right">

                        </q-card-actions>
                    </q-form>
                </div>
                <q-separator vertical inset />
                <div class="col">
                    <q-form>
                        <q-card-section>
                            <span
                                class="text-h6"
                                v-text="$t('role.boss')"
                            >
                            </span>
                        </q-card-section>

                        <q-card-section>

                        </q-card-section>
                        <q-card-actions align="right">

                        </q-card-actions>
                    </q-form>
                </div>
            </div>
        </q-card>
        <q-card class="q-mt-md">
            <q-form>
                <q-card-section>
                    <span
                        class="text-h6"
                        v-text="$t('operate.add')"
                    >
                    </span>
                </q-card-section>

                <q-card-section>

                </q-card-section>
                <q-card-actions align="right">

                </q-card-actions>
            </q-form>
        </q-card>
    </div>
</template>

<script>
import DistPicker from "@/components/DistPicker";
import { getCompanyInfo } from "@/api/admin/company.js";

export default {
    name: 'CompanyEdit',
    components: {
        DistPicker
    },
    data() {
        return {
            boss: {},
        };
    },
    created() {
        getCompanyInfo(this.$route.params.company_id).then(response => {
            console.log(response.data.result);
        });
    },
    mounted() {

    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
}
</script>
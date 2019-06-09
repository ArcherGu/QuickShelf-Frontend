<template>
    <div class="content">
        <div class="container row">
            <div class="col-md-6 col-xs-12 col-lg-4 q-ml-auto q-mr-auto">
                <q-card>
                    <q-card-section>
                        <img
                            src="../assets/login-card.png"
                            style="width: 100%"
                        >
                    </q-card-section>
                    <q-card-section>

                        <q-input
                            color="green q-mb-sm"
                            outlined
                            v-model.trim="form.username"
                            :label="$t('auth.username')"
                            :error="$v.form.username.$error"
                            autofocus
                        >
                            <template v-slot:prepend>
                                <q-icon name="account_circle" />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    name="close"
                                    @click="form.username = ''"
                                    class="cursor-pointer"
                                />
                            </template>
                        </q-input>

                        <q-input
                            color="green"
                            outlined
                            type="password"
                            v-model="form.password"
                            :label="$t('auth.password')"
                            @keyup.enter="login"
                            :error="$v.form.password.$error"
                        >
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    name="close"
                                    @click="form.password = ''"
                                    class="cursor-pointer"
                                />
                            </template>
                        </q-input>

                    </q-card-section>
                    <q-card-actions class="q-pl-md q-pr-md q-pb-md">
                        <q-btn
                            color="secondary full-width"
                            @click="login"
                            :label="$t('auth.login')"
                            size="lg"
                            :loading="loading"
                        />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            form: {
                username: "admin",
                password: "123"
            },
            loading: false,
        }
    },
    mounted() {
    },
    methods: {
        login() {
            this.$v.form.$touch();
            if (!this.$v.form.$error) {
                this.loading = true;
                this.$auth.login(this.form).then(() => {
                    this.$router.push('/');
                }).catch((error) => {
                    if (error.response) {
                        this.$q.dialog({
                            message: this.$t('errors.general_error')
                        })
                        console.log(error);
                    }
                }).finally(() => {
                    this.loading = false;
                })
            }
        }
    },
    validations: {
        form: {
            username: { required },
            password: { required }
        }
    }
}
</script>
<style scoped>
.content {
    padding-bottom: 150px;
    padding-top: 150px;
    min-height: 100vh;
    height: auto;
    background-image: url("../assets/bg.jpg");
    background-size: cover;
    background-position: top center;
}

.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px) {
    .container {
        max-width: 540px;
    }
}
@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}
</style>
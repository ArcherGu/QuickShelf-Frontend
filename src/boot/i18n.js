import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/i18n';
import { Quasar } from 'quasar';
import { axiosInstance } from '@/boot/axios';

Vue.use(VueI18n);
const i18nInstance = new VueI18n({
    locale: 'zh-cn',
    fallbackLocale: 'zh-cn',
    messages
});

export default ({ app }) => {
    app.i18n = i18nInstance
}

export { i18nInstance }

export const setLocale = (locale) => {
    i18nInstance.locale = locale;
    axiosInstance.defaults.headers.common['Accept-Language'] = locale;

    import(`quasar/lang/${locale}`).then(lang => {
        Quasar.lang.set(lang.default);
    })
}
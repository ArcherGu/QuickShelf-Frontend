import { i18nInstance } from '@/boot/i18n';

export function verifyPhoneNumber(variable) {
    if (variable) {
        return (
            /^((0\d{2,3}-\d{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/.test(variable) || 
            i18nInstance.t('errors.input_telephone')
        );
    }
    else {
        return true;
    }
}
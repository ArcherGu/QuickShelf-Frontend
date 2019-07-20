/**
 *  default company data structure
 */
import { DEF_DATA as DEF_DIST_DATA } from "./district";

export const DEF_DATA = {
    id: 0,
    is_use: 0,
    name: '',
    phone_number: '',
    boss_id: 0,
    bossName: '',
    currentShopNum: 0,
    max_shop_num: 1,
    ...DEF_DIST_DATA,
    address: '',
    adminFlag: '',
};
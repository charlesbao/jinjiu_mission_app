/**
 * Created by chalresbao on 16/11/24.
 */
const Constant = {
    CODE:{
        SUCCESS:200
    },
    ROUTER_PATH:{
        HOME: "/",
        LOGIN:"/LOGIN",
        REGISTER:"/REGISTER",
        USER:{
            WALLET:"/USER/WALLET",
            WITHDRAWS:"/USER/WITHDRAWS",
            FAVOUR:"/USER/FAVOUR",
            SETTING:"/USER/SETTING",
            SUPPORT:"/USER/SUPPORT"
        },
        MISSION:{
            SEARCH: "/MISSION/SEARCH",
            USER_MISSION: "/MISSION/USER-MISSION",
            MISSION_DETAIL: "/MISSION/MISSION-DETAIL",
            MISSION_POST:"/MISSION/MISSION-POST",
            COMMENT:"/MISSION/COMMENT"
        },
        SETTING:{
            SETTING_AVATAR: "/SETTING/AVATAR",
            SETTING_MOBILE: "/SETTING/MOBILE",
            SETTING_NICKNAME: "/SETTING/NICKNAME",
            SETTING_PASSWORD: "/SETTING/PASSWORD"
        },
        HAS_NO_TRANSITION:"?noTransition=1"
    },
    MISSION_KEY:{
        FILTER_TYPES:"FILTER_TYPES", //String类型,类型要两位数字 "10,12,15,16"
    },
    LOCAL_STORAGE_KEY:{
        SPLASH_SCREEN:"SPLASH_SCREEN",
        USER:"USER",
    },
    FILTER_LABEL:{
        BY_NEWEST:0,
        BY_BILLING:1,
        BY_ATTRIBUTE:2
    },
    MISSION_CONDITION: {
        ALL:0,
        ON_PREPARE:0,
        ON_PROGRESS:1,
        ON_CHECKING:2,
        ON_FINISH:3,
        ON_DESTROY:-1
    },
    MISSION_CONDITION_TYPE_LABEL: {
        '0':"全部",
        '1':"进行中",
        '2':"审核中",
        '3':"已完成",
        '-1':"已失效"
    },
    DETAIL_TABS: {
        DETAIL:"详情",
        EVALUATE:"评价",
        RECOMMEND:"推荐"
    },
    STORAGE_KEY: {
        LOCAL_MISSION_LIST:"MISSION",
        LOCAL_USER:"USER"
    },
    VERIFY_NUMBER_KEY:{
        REQUEST_PHONE_SUCCESS:1,
        REQUEST_PHONE_FAILED:-1,
        VERIFY_SMS_SUCCESS:2,
        VERIFY_SMS_FAILED:-2
    },
    ERROR:{
        LOGIN_OR_REGISTER_USER_FAILED:"LOGIN_OR_REGISTER_USER_FAILED",
        UPDATE_USER_INFO_FAILED:"UPDATE_USER_INFO_FAILED",
        REQUEST_PHONE_FAILED:"REQUEST_PHONE_FAILED",
        VERIFY_SMS_FAILED:"VERIFY_SMS_FAILED",
        REQUEST_PHONE_SUCCESS:"REQUEST_PHONE_SUCCESS",
        VERIFY_SMS_SUCCESS:"VERIFY_SMS_SUCCESS",
    }
};
export default Constant
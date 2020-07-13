import { T } from "./types";

export const actions = {
    // 시스템 관련
    [T.CHANGE_TOP_STYLE]({ commit }, style) {
        commit(T.CHANGE_TOP_STYLE, style);
    },

    // 회원 관련
    [T.SIGN_IN]({ commit }, params) {
        console.log(params);
        if (params.cb) params.cb();
    },
    [T.SIGN_UP]({ commit }, params) {
        console.log(params);
        if (params.cb) params.cb();
    },
    [T.LOGOUT]({ commit }, params) {
        console.log(params);
    },

    [T.GET_PROJECTS]({ commit }, params) {
        console.log(params);
        if (params.cb) params.cb();
    }
};

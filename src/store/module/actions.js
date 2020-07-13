import { T } from "./types";

export const actions = {
    [T.CHANGE_TOP_STYLE]({ commit }, style) {
        commit(T.CHANGE_TOP_STYLE, style);
    },
    [T.SIGNIN]({ commit }, params) {
        console.log(params);
        if (params.cb) params.cb();
    }
};

import { T } from "./types";

export const mutations = {
    [T.CHANGE_TOP_STYLE](state, string) {
        state.topStyle = string;
    },
    [T.CHANGE_USER_INFO](state, userInfo) {
        state.userInfo = userInfo;
    },

    [T.CHANGE_MEMBERS](state, members) {
        state.members = members;
    },
    [T.LOGOUT](state) {
        state.userInfo = {
            email: "",
            name: ""
        };
    },

    [T.CHANGE_WORKSPACE_ID](state, workspaceId) {
        state.workspaceId = workspaceId;
    },


};

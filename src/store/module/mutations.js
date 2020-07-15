import { T } from "./types";

export const mutations = {
    [T.CHANGE_TOP_STYLE](state, string) {
        state.topStyle = string;
    },

    [T.CHANGE_WORKSPACE_ID](state, workspaceId) {
        state.workspaceId = workspaceId;
    },


};

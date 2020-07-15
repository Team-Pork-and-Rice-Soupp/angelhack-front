import { T } from "./types";
import axios from "axios";

const apiURL = "http://kalin.iptime.org:4000";

export const actions = {
    // 시스템 관련
    [T.CHANGE_TOP_STYLE]({ commit }, style) {
        commit(T.CHANGE_TOP_STYLE, style);
    },

    // 회원 관련
    [T.SIGN_IN]({ commit }, params) {
        let options = {
            url() {
                return `${apiURL}/api/login`;
            }
        };
        let api = axios.create();

        axios
            .all([
                api.post(options.url(), {
                    email: params.email,
                    password: params.password
                })
            ])
            .then(responses => {
                console.log(responses);
                if (params.cb) params.cb();
            })
            .catch(error => {
                cErr(error.response);
            });
    },
    [T.SIGN_UP]({ commit }, params) {
        console.log(params);
        let options = {
            url() {
                return `${apiURL}/api/signup`;
            }
        };
        let api = axios.create();
        /*
                axios
                    .all([
                        api.post(options.url(), {
                            email: params.email,
                            password: params.password
                        })
                    ])
                    .then(responses => {
                        console.log(responses);
                        if (params.cb) params.cb();
                    })
                    .catch(error => {
                        cErr(error.response);
                    });
        */
        if (params.cb) params.cb();
    },
    [T.LOGOUT]({ commit }, params) {
        console.log(params);
    },


    [T.ADD_WORKSPACE]({ commit }, params) {
        let options = {
            url() {
                return `${apiURL}/api/workspace`;
            }
        };
        let api = axios.create();
        /*
                axios
                    .all([
                        api.post(options.url(), {
                            email: params.email,
                            password: params.password
                        })
                    ])
                    .then(responses => {
                        console.log(responses);
                        if (params.cb) params.cb();
                    })
                    .catch(error => {
                        cErr(error.response);
                    });
        */
    },
    [T.DELETE_WORKSPACE]({ commit }, params) {
        let options = {
            url() {
                return `${apiURL}/api/workspace/` + params.workspaceId;
            }
        };
        let api = axios.create();
        /*
                axios
                    .all([
                        api.delete(options.url(), {
                            email: params.email,
                            password: params.password
                        })
                    ])
                    .then(responses => {
                        console.log(responses);
                        if (params.cb) params.cb();
                    })
                    .catch(error => {
                        cErr(error.response);
                    });
        */
    },
    [T.GET_PROJECTS]({ commit }, params) {
        console.log(params);
        let options = {
            url() {
                return `${apiURL}/api/workspace`;
            }
        };
        let api = axios.create();
        /*
                axios
                    .all([
                        api.get(options.url(), {
                            email: params.email,
                            password: params.password
                        })
                    ])
                    .then(responses => {
                        console.log(responses);
                        if (params.cb) params.cb();
                    })
                    .catch(error => {
                        cErr(error.response);
                    });
        */
        if (params.cb) params.cb();
    },
    [T.GET_WORKSPACE_DETAIL]({ commit }, params) {
        console.log(params.id);
        let options = {
            url() {
                return `${apiURL}/api/workspace/` + params.workspaceId;
            }
        };
        let api = axios.create();
        /*
                axios
                    .all([
                        api.get(options.url(), {
                            email: params.email,
                            password: params.password
                        })
                    ])
                    .then(responses => {
                        console.log(responses);
                        if (params.cb) params.cb();
                    })
                    .catch(error => {
                        cErr(error.response);
                    });
        */
        if (params.cb) params.cb("test");
    },
    [T.SEARCH_USER]({ commit }, params) {
        console.log(params.id);
        let options = {
            url() {
                return `${apiURL}/api/users/`;
            }
        };
        let api = axios.create();
        /*
                axios
                    .all([
                        api.get(options.url(), {
                            params:{}
                        })
                    ])
                    .then(responses => {
                        console.log(responses);
                        if (params.cb) params.cb();
                    })
                    .catch(error => {
                        cErr(error.response);
                    });
        */
        if (params.cb) params.cb("test");
    },
};

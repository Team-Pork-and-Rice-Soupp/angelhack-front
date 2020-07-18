import { T } from "./types";
import axios from "axios";

const apiURL = "http://kalin.iptime.org:4000";

export const actions = {
    // 시스템 관련
    [T.CHANGE_TOP_STYLE]({ commit }, style) {
        commit(T.CHANGE_TOP_STYLE, style);
    },
    [T.CHANGE_USER_INFO]({ commit }, params) {
        commit(T.CHANGE_USER_INFO, params);
    },

    // 회원 관련
    [T.SIGN_IN]({ commit }, params) {
        let options = {
            url() {
                return `${apiURL}/auth/login`;
            }
        };
        let api = axios.create();

        axios
            .all([
                api.post(options.url(), {
                    email: params.email,
                    pw: params.password
                })
            ])
            .then(responses => {
                console.log(responses);
                let errors = responses.filter(res => {
                    return res.status !== 200;
                });
                if (errors.length < 1) {
                    params.cb(responses[0].data);
                }
            })
            .catch(error => {
                params.cErr(error);
            });
    },
    [T.SIGN_UP]({ commit }, params) {
        console.log(params);
        let options = {
            url() {
                return `${apiURL}/auth/signup`;
            }
        };
        let api = axios.create();

        axios
            .all([
                api.post(options.url(), {
                    email: params.email,
                    name: params.name,
                    pw: params.password
                })
            ])
            .then(responses => {
                if (params.cb) params.cb();
            })
            .catch(error => {
                params.cErr();
            });

    },
    [T.LOGOUT]({ commit }, params) {
        console.log(params);
    },
    [T.LOGIN_CHECK]({ commit }, params) {
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo) {
            commit(T.CHANGE_USER_INFO, userInfo);
        } else {
            params.goBack();
            alert("다시 로그인 해주세요.")
        }
    },


    [T.ADD_WORKSPACE]({ commit }, params) {
        let options = {
            url() {
                return `${apiURL}/api/workspace`;
            }
        };
        let api = axios.create();
        console.log(params.addWorkspaceInfo)

        axios
            .all([
                api.post(options.url(), params.addWorkspaceInfo, {
                    headers: {
                        auth: params.token
                    }
                })
            ])
            .then(responses => {
                let errors = responses.filter(res => {
                    return res.status !== 201;
                });
                if (errors.length < 1) {
                    params.cb();
                }

            })
            .catch(error => {
                params.cErr();
            });


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

        axios
            .all([
                api.get(options.url(), {
                    headers: {
                        auth: params.token
                    }
                })
            ])
            .then(responses => {
                console.log(responses);
                let errors = responses.filter(res => {
                    return res.status !== 200;
                });
                if (errors.length < 1) {
                    console.log(responses[0].data)
                    params.cb(responses[0].data);
                }
            })
            .catch(error => {
                params.cErr(error);
            });
    },
    [T.GET_WORKSPACE_DETAIL]({ commit }, params) {
        let options = {
            url() {
                return `${apiURL}/api/workspace/` + params.workspaceId;
            }
        };
        let api = axios.create();
        axios
            .all([
                api.get(options.url(), {
                    headers: {
                        auth: params.token
                    }
                })
            ])
            .then(responses => {
                console.log(responses);
                let errors = responses.filter(res => {
                    return res.status !== 200;
                });
                if (errors.length < 1) {
                    params.cb(responses[0].data);
                }
            })
            .catch(error => {
                params.cErr(error);
            });
    },
    [T.SEARCH_USER]({ commit }, params) {
        let options = {
            url() {
                return `${apiURL}/api/users/search`;
            }
        };
        let api = axios.create();

        console.log(params.token)
        axios
            .all([
                api.get(options.url(), {
                    params: {
                        keyword: params.keyword
                    },
                    headers: {
                        auth: params.token
                    }
                })
            ])
            .then(responses => {
                console.log(responses);
                let errors = responses.filter(res => {
                    return res.status !== 200;
                });
                if (errors.length < 1) {
                    params.cb(responses[0].data);
                }

            })
            .catch(error => {
                params.cErr(error.response);
            });
    },

    [T.CHANGE_WORKSPACE_ID]({ commit }, workspaceId) {
        commit(T.CHANGE_WORKSPACE_ID, workspaceId);
    },
    // [T.ADD_MEETINGLOG]({ commit }, params) {
    //     let options = {
    //         url() {
    //             return `${apiURL}/api/workspace/${params.workspaceId}/log`;
    //         }
    //     };
    //     let api = axios.create();

    //     console.log(params.token)
    //     axios
    //         .all([
    //             api.get(options.url(), {
    //                 params: {
    //                     keyword: params.keyword
    //                 },
    //                 headers: {
    //                     auth: params.token
    //                 }
    //             })
    //         ])
    //         .then(responses => {
    //             console.log(responses);
    //             let errors = responses.filter(res => {
    //                 return res.status !== 200;
    //             });
    //             if (errors.length < 1) {
    //                 params.cb(responses[0].data);
    //             }

    //         })
    //         .catch(error => {
    //             params.cErr(error.response);
    //         });
    // },
};

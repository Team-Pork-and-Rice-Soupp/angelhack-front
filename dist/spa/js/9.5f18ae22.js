(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"0a0d":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"add-workspace"},[a("div",{staticClass:"add-workspace__buttons"},[a("q-btn",{attrs:{label:"나가기"},on:{click:function(t){return e.movePage("/ProjectList")}}}),a("q-btn",{attrs:{label:"생성하기"},on:{click:e.onClickAddWorkspace}})],1),a("add-workspace")],1)},r=[],c=(a("e01a"),a("d874")),o=a("1484"),i={data(){return{}},components:{AddWorkspace:o["a"]},mounted(){this.$store.dispatch(c["a"].LOGIN_CHECK,{goBack:()=>{this.$router.push("/")}})},methods:{movePage(e){this.$router.push(""+e)},onClickAddWorkspace(){let e={title:this.$children.find(e=>"addWorkspace"==e.vueName).title,description:this.$children.find(e=>"addWorkspace"==e.vueName).description};if(""==e.title)alert("워크스페이스의 제목을 입력해주세요.");else if(""==e.description)alert("워크스페이스의 설명을 입력해주세요.");else{let t=this;e.members=this.$children.find(e=>"addWorkspace"==e.vueName).refineMembers(),e.members&&this.$store.dispatch(c["a"].ADD_WORKSPACE,{token:localStorage.getItem("token"),addWorkspaceInfo:e,cb:()=>{t.movePage("/ProjectList"),alert("워크스페이스가 생성되었습니다.")},cErr:()=>{alert("문제가 발생하였습니다.")}})}}}},n=i,d=(a("9311"),a("2877")),l=a("9c40"),p=a("eebe"),u=a.n(p),k=Object(d["a"])(n,s,r,!1,null,"68c6ce5a",null);t["default"]=k.exports;u()(k,"components",{QBtn:l["a"]})},"7a4d":function(e,t,a){},9311:function(e,t,a){"use strict";var s=a("7a4d"),r=a.n(s);r.a}}]);
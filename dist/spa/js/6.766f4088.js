(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"1b0e":function(t,e,c){},"5e1d":function(t,e,c){},9356:function(t,e,c){"use strict";var s=c("5e1d"),a=c.n(s);a.a},"9a96":function(t,e,c){"use strict";c.r(e);var s=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"project-list"},[t._l(t.projects,(function(e,s){return c("workspace-card",{key:s,attrs:{workspaceId:e.Id},scopedSlots:t._u([{key:"card-title",fn:function(){return[t._v(t._s(e.title))]},proxy:!0},{key:"card-description",fn:function(){return[t._v(t._s(e.description))]},proxy:!0}],null,!0)})})),c("workspace-card",{attrs:{addButton:!0},scopedSlots:t._u([{key:"add-card",fn:function(){return[t._v("new+")]},proxy:!0}])})],2)},a=[],r=c("d874"),o=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("q-card",{staticClass:"workspace-card",on:{click:t.clickAction}},[t.addButton?t._e():c("div",{staticClass:"workspace-card__contents"},[c("q-card-section",[c("h1",[t._t("card-title")],2)]),c("q-card-section",[c("p",[t._t("card-description")],2)])],1),!0===t.addButton?c("div",{staticClass:"workspace-card__contents"},[c("q-card-section",[c("div",{staticClass:"add-card"},[t._t("add-card")],2)])],1):t._e()])},n=[],d={name:"workspace-card",props:["workspaceId","addButton"],data(){return{}},methods:{movePage(t){this.$router.push(""+t)},clickAction(){this.addButton?this.$router.push("/AddProject"):this.movePage("/Dashboard?id="+this.workspaceId)}}},i=d,u=(c("a911"),c("2877")),p=c("f09f"),l=c("a370"),_=c("eebe"),h=c.n(_),f=Object(u["a"])(i,o,n,!1,null,"62dbc117",null),k=f.exports;h()(f,"components",{QCard:p["a"],QCardSection:l["a"]});var v={data(){return{projects:[{title:"test1",description:"설명입니다.",Id:"q1w2e3r4"},{title:"test2",description:"설명입니다.",Id:"mansbuy13579"}]}},components:{WorkspaceCard:k},mounted(){this.$store.dispatch(r["a"].CHANGE_TOP_STYLE,""),this.getProjects()},methods:{movePage(t){this.$router.push(""+t)},getProjects(){this.$store.dispatch(r["a"].GET_PROJECTS,{userId:"",cb:()=>{console.log("GET_PROJECTS")}})},action1(){console.log("action1")},addProject(){this.movePage("/AddProject")}}},w=v,m=(c("9356"),Object(u["a"])(w,s,a,!1,null,"9be92070",null));e["default"]=m.exports},a911:function(t,e,c){"use strict";var s=c("1b0e"),a=c.n(s);a.a}}]);
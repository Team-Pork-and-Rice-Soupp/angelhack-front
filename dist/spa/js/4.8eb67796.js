(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{7646:function(t,e,c){},"9a96":function(t,e,c){"use strict";c.r(e);var r=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"project-list"},[t._l(t.projects,(function(e,r){return c("workspace-card",{key:r,attrs:{clickAction:t.action1},scopedSlots:t._u([{key:"card-title",fn:function(){return[t._v(t._s(e.title))]},proxy:!0},{key:"card-description",fn:function(){return[t._v(t._s(e.description))]},proxy:!0},{key:"card-action",fn:function(){},proxy:!0}],null,!0)})})),c("workspace-card",{attrs:{clickAction:t.addProject},scopedSlots:t._u([{key:"card-title",fn:function(){return[t._v("+")]},proxy:!0}])})],2)},n=[],o=c("d874"),a=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("q-card",{staticClass:"worksapce-card",on:{click:t.clickAction}},[c("q-card-section",[c("h1",[t._t("card-title")],2)]),c("q-card-section",[c("p",[t._t("card-description")],2)])],1)},s=[],i={name:"workspace-card",props:["clickAction"],data(){return{}},methods:{}},d=i,l=(c("b97b"),c("2877")),u=c("f09f"),p=c("a370"),f=c("eebe"),_=c.n(f),k=Object(l["a"])(d,a,s,!1,null,"2ab9f756",null),h=k.exports;_()(k,"components",{QCard:u["a"],QCardSection:p["a"]});var v={data(){return{projects:[{title:"test1",description:"설명입니다."},{title:"test2",description:"설명입니다."}]}},components:{WorkspaceCard:h},mounted(){this.$store.dispatch(o["a"].CHANGE_TOP_STYLE,""),this.getProjects()},methods:{movePage(t){this.$router.push(""+t)},getProjects(){this.$store.dispatch(o["a"].GET_PROJECTS,{userId:"",cb:()=>{console.log("GET_PROJECTS")}})},action1(){console.log("action1")},addProject(){this.movePage("/AddProject")}}},b=v,j=(c("9f3a"),Object(l["a"])(b,r,n,!1,null,"75aec06d",null));e["default"]=j.exports},"9f3a":function(t,e,c){"use strict";var r=c("7646"),n=c.n(r);n.a},b97b:function(t,e,c){"use strict";var r=c("e0f9"),n=c.n(r);n.a},e0f9:function(t,e,c){}}]);
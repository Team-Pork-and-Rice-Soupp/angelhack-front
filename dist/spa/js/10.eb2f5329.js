(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"4b84":function(e,a,t){},"6a9e":function(e,a,t){"use strict";var s=t("4b84"),o=t.n(s);o.a},"6c6a":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"assesment-page"},e._l(e.datacollection,(function(a,s){return e.loading?t("q-card",{key:s},[t("chart",{staticClass:"small",attrs:{chartData:a,options:e.options}})],1):e._e()})),1)},o=[],l=t("ded3"),n=t.n(l),c=t("d874"),r=t("2f62"),d=t("3fdc"),i={name:"contribution-stat",components:{Chart:d["a"]},computed:n()({},Object(r["b"])({members:"getMembers",workspaceId:"getWorkspaceId"})),data(){return{datacollection:[{labels:[],datasets:[{label:"문제 인식 단계",backgroundColor:"#f87979",data:[]}]},{labels:[],datasets:[{label:"문제 정의 단게",backgroundColor:"#e470ff",data:[]}]},{labels:[],datasets:[{label:"문제 정검 단계",backgroundColor:"#f2c037",data:[]}]},{labels:[],datasets:[{label:"아이디어 도출 단계",backgroundColor:"#60dec8",data:[]}]},{labels:[],datasets:[{label:"해결 정리 단계",backgroundColor:"#56acf7",data:[]}]}],options:{scales:{xAxes:[{barPercentage:.5}],yAxes:[{ticks:{beginAtZero:!0,suggestedMax:10}}]}},loading:!1}},mounted(){this.setMembers(),this.getData()},methods:{setMembers(){let e=[];this.members.forEach(a=>{e.push(a.name)}),this.datacollection.forEach(a=>{a.labels=e})},getData(){console.log(this.members);let e=this;this.$store.dispatch(c["a"].GET_ASSESSMENT,{workspaceId:this.workspaceId,token:localStorage.getItem("token"),cb:a=>{a.forEach(t=>{let s=e.members.find(e=>e.email==t.email).name,o=0;t.scores.forEach((t,l)=>{(l+1)%(a.length-1)==0?(o+=t,e.setPoint(s,o,(l+1)/(a.length-1)),o=0):o+=t})}),console.log(e.members),e.loading=!0}})},setPoint(e,a,t){console.log(this.datacollection[t-1].datasets[0].label,e),this.datacollection[t-1].datasets[0].data[this.datacollection[t-1].labels.findIndex(a=>a==e)]=a}}},b=i,m=(t("6a9e"),t("2877")),h=t("f09f"),g=t("eebe"),u=t.n(g),f=Object(m["a"])(b,s,o,!1,null,"9290a762",null);a["default"]=f.exports;u()(f,"components",{QCard:h["a"]})}}]);
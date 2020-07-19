(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{1484:function(e,a,t){"use strict";var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"add-workspace-card"},[t("q-card",{staticClass:"add-workspace-card__info"},[t("div",{staticClass:"info-title"},[e._v("워크스페이스 정보")]),t("q-input",{attrs:{filled:"",label:"제목"},model:{value:e.title,callback:function(a){e.title=a},expression:"title"}}),t("q-input",{attrs:{filled:"",label:"설명"},model:{value:e.description,callback:function(a){e.description=a},expression:"description"}}),t("q-form",{staticClass:"search-form",on:{submit:e.searchMember}},[t("q-input",{ref:"keyword",attrs:{filled:"",placeholder:"팀원 이메일 검색"},model:{value:e.keyword,callback:function(a){e.keyword=a},expression:"keyword"}}),t("div",{staticClass:"search-form__button"},[t("q-btn",{attrs:{flat:"",label:"search",color:"blue",type:"submit"}})],1)],1)],1),t("div",{staticClass:"add-workspace-card__members"},e._l(e.members,(function(e,a){return t("add-member-card",{key:a,attrs:{memberInfo:e}})})),1),t("q-dialog",{on:{hide:e.hideDialog},model:{value:e.dialogOpened,callback:function(a){e.dialogOpened=a},expression:"dialogOpened"}},[t("div",{staticClass:"dashboard-dialog"},[t("div",{staticClass:"dashboard-dialog__text"},e._l(e.searchResults,(function(a,s){return t("div",{key:s,staticClass:"user-div"},[t("div",{staticClass:"user-div__info"},[t("span",[e._v(e._s(a.name))]),t("span",[e._v(e._s(a.email))])]),t("div",{staticClass:"user-div__buttons"},[t("q-btn",{attrs:{label:a.selected?"delete":"select",color:a.selected?"negative":"positive",flat:""},on:{click:function(t){return e.onResultClick(a)}}})],1),s+1!=e.searchResults.length?t("hr"):e._e()])})),0),t("div",{staticClass:"dashboard-dialog__buttons"},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Cancel",flat:"",color:"negative"}}),t("q-btn",{attrs:{label:"Confirm",flat:"",color:"primary"},on:{click:e.onclickConfirm}})],1)])])],1)},l=[],n=(t("a434"),t("ded3")),i=t.n(n),c=t("d874"),r=t("2f62"),o=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-card",{staticClass:"add-member-card"},[t("div",{staticClass:"top"},[t("q-icon",{attrs:{name:"person"}}),e.memberInfo.isMe?e._e():t("q-btn",{attrs:{label:"DELETE",flat:"",color:"red"},on:{click:function(a){e.dialogOpened=!0}}})],1),t("span",{staticClass:"title"},[e._v("이름 : "+e._s(e.memberInfo.name))]),t("span",{staticClass:"title"},[e._v("이메일 : "+e._s(e.memberInfo.email))]),t("q-input",{attrs:{filled:"",label:"팀원 설명"},model:{value:e.memberDescription,callback:function(a){e.memberDescription=a},expression:"memberDescription"}}),t("q-radio",{attrs:{val:"MANAGER",label:"Manager"},model:{value:e.memberRole,callback:function(a){e.memberRole=a},expression:"memberRole"}}),t("q-radio",{attrs:{val:"CREW",label:"Crew"},model:{value:e.memberRole,callback:function(a){e.memberRole=a},expression:"memberRole"}}),t("q-dialog",{model:{value:e.dialogOpened,callback:function(a){e.dialogOpened=a},expression:"dialogOpened"}},[t("div",{staticClass:"dashboard-dialog"},[t("div",{staticClass:"dashboard-dialog__text"},[e._v("팀원을 삭제하시겠습니까?")]),t("div",{staticClass:"dashboard-dialog__buttons"},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"취소"}}),t("q-btn",{attrs:{flat:"",label:"삭제",color:"red"},on:{click:e.onClickDelete}})],1)])])],1)},d=[],b={name:"AddMemberCard",props:["memberInfo"],data(){return{vueName:"addMemberCard",dialogOpened:!1,memberDescription:"",memberRole:null}},methods:{onClickDelete(){this.$parent.members.splice(this.$parent.members.findIndex(e=>e.email==this.memberInfo.email),1),this.dialogOpened=!1}}},m=b,f=(t("db76"),t("2877")),u=t("f09f"),p=t("0016"),h=t("9c40"),j=t("27f9"),k=t("3786"),v=t("24e8"),g=t("7f67"),y=t("eebe"),C=t.n(y),w=Object(f["a"])(m,o,d,!1,null,"c4ebb8ae",null),q=w.exports;C()(w,"components",{QCard:u["a"],QIcon:p["a"],QBtn:h["a"],QInput:j["a"],QRadio:k["a"],QDialog:v["a"]}),C()(w,"directives",{ClosePopup:g["a"]});var x={name:"add-workspace",components:{AddMemberCard:q},computed:i()({},Object(r["b"])({userInfo:"getUserInfo"})),data(){return{vueName:"addWorkspace",title:"",description:"",members:[],keyword:"",dialogOpened:!1,selectedMembers:[],thumbStyle:{right:"4px",borderRadius:"5px",backgroundColor:"#027be3",width:"5px",opacity:.75},searchResults:[],barStyle:{right:"2px",borderRadius:"9px",backgroundColor:"#027be3",width:"9px",opacity:.2}}},mounted(){this.userInfo.email&&this.setMyMember(this.userInfo)},methods:{refineMembers(){let e=[];const a=this.$children.filter(e=>"addMemberCard"==e.vueName);let t=!0;return this.members.forEach(s=>{t&&(""==a.find(e=>e.memberInfo.email==s.email).memberDescription?(alert("팀원 카드의 정보를 입력해주세요."),t=!1):a.find(e=>e.memberInfo.email==s.email).memberRole?e.push({email:s.email,description:a.find(e=>e.memberInfo.email==s.email).memberDescription,role:a.find(e=>e.memberInfo.email==s.email).memberRole}):(alert("팀원 카드의 정보를 입력해주세요."),t=!1))}),!!t&&e},onclickConfirm(){if(this.selectedMembers.length){let e,a,t=[];this.selectedMembers.forEach((s,l)=>{e=!0,this.members.forEach((t,l)=>{t.email==s.email&&(e=!1,a=!0)}),e&&t.push(s)});let s=!1;t.forEach(e=>{this.members.push(e),s=!0}),a&&alert("중복되는 인물은 추가되지 않습니다."),s&&(this.selectedMembers=[],this.dialogOpened=!1)}else alert("팀원을 선택해주세요.")},searchMember(){if(""==this.keyword)alert("검색어를 입력해주세요.");else{let e=this;this.$store.dispatch(c["a"].SEARCH_USER,{keyword:this.keyword,token:localStorage.getItem("token"),cb:a=>{console.log("search results >> ",a),a.length>0?(a.forEach(e=>{e.selected=!1}),e.searchResults=a,e.dialogOpened=!0):alert("검색된 유저가 없습니다.")},cErr:e=>{console.log(e),alert("오류가 발생하였습니다.")}})}},onResultClick(e){if(e.selected){const a=this.selectedMembers.findIndex(a=>a.email==e.email);-1!==a&&(this.selectedMembers.splice(a,1),e.selected=!1)}else this.selectedMembers.push(e),e.selected=!0},setMyMember(e){this.members.push({name:e.name,email:e.email,isMe:!0})},hideDialog(){this.keyword="",this.selectedMembers=[]}}},_=x,I=(t("49d5"),t("b997"),t("0378")),O=Object(f["a"])(_,s,l,!1,null,"f22c0522",null);a["a"]=O.exports;C()(O,"components",{QCard:u["a"],QInput:j["a"],QForm:I["a"],QBtn:h["a"],QDialog:v["a"]}),C()(O,"directives",{ClosePopup:g["a"]})},"3fdc":function(e,a,t){"use strict";var s=t("1fca");const{reactiveProp:l}=s["b"];var n,i,c={extends:s["a"],mixins:[l],props:["chartData","options"],mounted(){this.renderChart(this.chartData,this.options)},data(){return{datacollection:null}}},r=c,o=t("2877"),d=Object(o["a"])(r,n,i,!1,null,null,null);a["a"]=d.exports},4678:function(e,a,t){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df48","./fa.js":"8df48","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b46","./gd.js":"f6b46","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function l(e){var a=n(e);return t(a)}function n(e){if(!t.o(s,e)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return s[e]}l.keys=function(){return Object.keys(s)},l.resolve=n,e.exports=l,l.id="4678"},"49d5":function(e,a,t){"use strict";var s=t("e433"),l=t.n(s);l.a},b997:function(e,a,t){"use strict";var s=t("f2ac"),l=t.n(s);l.a},c9b8:function(e,a,t){},d0a0:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"pareto-chart"},[t("div",[e.tableEnabled?e._e():t("div",[t("q-input",{attrs:{filled:"",label:"비교 항목"},model:{value:e.scaleOption.xScaleLabel,callback:function(a){e.$set(e.scaleOption,"xScaleLabel",a)},expression:"scaleOption.xScaleLabel"}}),t("q-input",{attrs:{filled:"",label:"데이터 단위"},model:{value:e.scaleOption.yScaleLabel,callback:function(a){e.$set(e.scaleOption,"yScaleLabel",a)},expression:"scaleOption.yScaleLabel"}}),t("q-btn",{attrs:{label:"표 생성"},on:{click:e.enableTable}})],1),e.tableEnabled?t("div",[t("q-table",{staticClass:"table",attrs:{title:"데이터",data:e.data,columns:e.columns,"row-key":"number",selection:"multiple"},scopedSlots:e._u([{key:"header",fn:function(a){return[t("q-tr",{attrs:{props:a}},e._l(a.cols,(function(s){return t("q-th",{key:s.name,attrs:{props:a}},[e._v(e._s(s.label))])})),1)]}},{key:"body",fn:function(a){return[t("q-tr",{attrs:{props:a}},[t("q-td",{key:"number",attrs:{props:a}},[e._v(e._s(a.row.number))]),t("q-td",{key:"item",attrs:{props:a}},[e._v(e._s(a.row.item))]),t("q-td",{key:"quantity",attrs:{props:a}},[e._v(e._s(a.row.quantity))]),t("q-td",[t("q-btn",{attrs:{label:"삭제",color:"negative"},on:{click:function(t){return e.deleteRow(a.row)}}})],1)],1)]}}],null,!1,3340217520)}),t("q-input",{attrs:{filled:"",label:e.scaleOption.xScaleLabel},model:{value:e.newData.item,callback:function(a){e.$set(e.newData,"item",a)},expression:"newData.item"}}),t("q-input",{attrs:{filled:"",type:"number",label:e.scaleOption.yScaleLabel},model:{value:e.newData.quantity,callback:function(a){e.$set(e.newData,"quantity",a)},expression:"newData.quantity"}}),t("q-btn",{attrs:{label:"데이터 추가"},on:{click:e.addNewRow}})],1):e._e()]),t("pareto-chart",{key:e.refreshChart,staticClass:"small",attrs:{chartData:e.datacollection,options:e.options}})],1)},l=[],n=(t("4e82"),t("a434"),t("ddb0"),t("3fdc")),i={name:"pareto",components:{ParetoChart:n["a"]},data(){return{vueName:"paretoChart",tableEnabled:!1,scaleOption:{xScaleLabel:"",xScaleLabel:""},refreshChart:1,rawDataList:[],newData:{number:"",item:"",quantity:""},columns:[{name:"number",required:!0,label:"번호",align:"center"},{name:"item",align:"center",label:"항목",field:"item"},{name:"quantity",label:"수량",field:"quantity"},{name:"deleteButton",align:"center",label:"",field:"deleteButton"}],data:[],datacollection:{labels:[],datasets:[{type:"line",label:"누적",borderColor:"#BA1E14",backgroundColor:"#BA1E14",pointBorderWidth:5,fill:!1,data:[],yAxisID:"y-axis-2"},{type:"bar",label:"판매수량",borderColor:"#56B513",backgroundColor:"#56B513",data:[],yAxisID:"y-axis-1"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{stacked:!0,scaleLabel:{display:!0,labelString:"비교항목"},barPercentage:.5}],yAxes:[{type:"linear",position:"left",id:"y-axis-1",stacked:!0,ticks:{suggestedMin:0},scaleLabel:{display:!0,labelString:"데이터 단위"}},{type:"linear",position:"right",id:"y-axis-2",ticks:{suggestedMin:0,callback:function(e){return e+"%"}},scaleLabel:{display:!0,labelString:"%"}}]}}}},methods:{deleteRow(e){let a=this.data.findIndex(a=>a.number==e.number),t=this.data[a],s=this.datacollection.labels.findIndex(e=>e==t.item),l=this.datacollection.datasets[1].data.findIndex(e=>e==t.quantity);this.datacollection.labels.splice(s,1),this.datacollection.datasets[1].data.splice(l,1),this.datacollection.datasets[0].data=[];let n=this.datacollection.datasets[1].data.reduce((e,a)=>parseInt(e)+parseInt(a));console.log("sum >> ",n);let i=0;this.datacollection.datasets[1].data.forEach(e=>{let a=e/n*100;i+=a,console.log("percent >> ",a),console.log("accPercent >> ",i),this.datacollection.datasets[0].data.push(i)}),this.data.splice(a,1),this.refreshChart*=-1},enableTable(){this.refreshChart*=-1,this.getTable()},getTable(){this.options.scales.xAxes[0].scaleLabel.labelString=this.scaleOption.xScaleLabel,this.options.scales.yAxes[0].scaleLabel.labelString=this.scaleOption.yScaleLabel,this.columns[1].label=this.scaleOption.xScaleLabel,this.columns[2].label=this.scaleOption.yScaleLabel,this.tableEnabled=!0},addNewRow(){this.newData.number=this.data.length+1,this.data.push(this.newData),this.generateParetoChart(this.data)},generateParetoChart(e){let a=[...e];a.sort((e,a)=>parseInt(e.quantity)>parseInt(a.quantity)?-1:parseInt(e.quantity)==parseInt(a.quantity)?0:parseInt(e.quantity)<parseInt(a.quantity)?1:void 0),this.datacollection.labels=[],this.datacollection.datasets[0].data=[],this.datacollection.datasets[1].data=[],a.forEach(e=>{this.datacollection.labels.push(e.item),this.datacollection.datasets[1].data.push(e.quantity)});let t=this.datacollection.datasets[1].data.reduce((e,a)=>parseInt(e)+parseInt(a));console.log("sum >> ",t);let s=0;this.datacollection.datasets[1].data.forEach(e=>{let a=e/t*100;s+=a,console.log("percent >> ",a),console.log("accPercent >> ",s),this.datacollection.datasets[0].data.push(s)}),this.newData={number:"",item:"",quantity:""},this.refreshChart*=-1},isLastRow(e){if(e==this.data[this.data.length-1])return!0}}},c=i,r=(t("ea7c"),t("2877")),o=t("27f9"),d=t("9c40"),b=t("eaac"),m=t("bd08"),f=t("357e"),u=t("db86"),p=t("eebe"),h=t.n(p),j=Object(r["a"])(c,s,l,!1,null,"2903ec4c",null);a["default"]=j.exports;h()(j,"components",{QInput:o["a"],QBtn:d["a"],QTable:b["a"],QTr:m["a"],QTh:f["a"],QTd:u["a"]})},db76:function(e,a,t){"use strict";var s=t("c9b8"),l=t.n(s);l.a},e433:function(e,a,t){},ea7c:function(e,a,t){"use strict";var s=t("efec"),l=t.n(s);l.a},efec:function(e,a,t){},f2ac:function(e,a,t){}}]);
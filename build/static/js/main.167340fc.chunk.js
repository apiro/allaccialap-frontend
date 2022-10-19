(this["webpackJsonpamplify-app"]=this["webpackJsonpamplify-app"]||[]).push([[0],{141:function(t,e,n){},147:function(t,e){},205:function(t,e,n){var i={"./amplify-amazon-button_5.entry.js":[211,16],"./amplify-auth-container.entry.js":[212,17],"./amplify-auth-fields_9.entry.js":[213,18],"./amplify-authenticator.entry.js":[214,5],"./amplify-button_3.entry.js":[215,19],"./amplify-chatbot.entry.js":[216,4],"./amplify-checkbox.entry.js":[217,20],"./amplify-confirm-sign-in_7.entry.js":[218,6],"./amplify-container.entry.js":[219,21],"./amplify-federated-buttons_2.entry.js":[220,22],"./amplify-federated-sign-in.entry.js":[221,23],"./amplify-form-field_4.entry.js":[222,24],"./amplify-greetings.entry.js":[223,25],"./amplify-icon-button.entry.js":[224,26],"./amplify-icon.entry.js":[225,7],"./amplify-link.entry.js":[226,27],"./amplify-nav_2.entry.js":[227,28],"./amplify-photo-picker.entry.js":[228,29],"./amplify-picker.entry.js":[229,30],"./amplify-radio-button_3.entry.js":[230,8],"./amplify-s3-album.entry.js":[231,9],"./amplify-s3-image-picker.entry.js":[232,10],"./amplify-s3-image.entry.js":[233,11],"./amplify-s3-text-picker.entry.js":[234,12],"./amplify-s3-text.entry.js":[235,13],"./amplify-select-mfa-type.entry.js":[236,31],"./amplify-sign-in-button.entry.js":[237,14],"./amplify-tooltip.entry.js":[238,32]};function r(t){if(!n.o(i,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=i[t],r=e[0];return n.e(e[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(i)},r.id=205,t.exports=r},207:function(t,e,n){"use strict";n.r(e);var i=n(11),r=n.n(i),a=n(115),s=n.n(a),o=(n(141),n(36)),c=n.n(o),p=n(71),u=n(72),d=n(73),l=n(76),f=n(74),m=n(116),y=n(114),j=n(206),h=n(263),b=n(264),_={aws_project_region:"us-east-1",aws_cognito_identity_pool_id:"us-east-1:81ef3c60-95ad-408b-be9b-1b564d92d8e6",aws_cognito_region:"us-east-1",aws_user_pools_id:"us-east-1_dN70jVDY4",aws_user_pools_web_client_id:"jvuu1mmn5p90i7bofhptrjelq",oauth:{},aws_cognito_username_attributes:[],aws_cognito_social_providers:[],aws_cognito_signup_attributes:["EMAIL"],aws_cognito_mfa_configuration:"OFF",aws_cognito_mfa_types:["SMS"],aws_cognito_password_protection_settings:{passwordPolicyMinLength:8,passwordPolicyCharacters:[]},aws_cognito_verification_mechanisms:["EMAIL"],aws_appsync_graphqlEndpoint:"https://v2zicxt5ejd5hkct7i6xpuzgtu.appsync-api.us-east-1.amazonaws.com/graphql",aws_appsync_region:"us-east-1",aws_appsync_authenticationType:"AMAZON_COGNITO_USER_POOLS"},g=n(16);m.default.configure(_);var v=function(t){Object(l.a)(n,t);var e=Object(f.a)(n);function n(t){var i;return Object(u.a)(this,n),(i=e.call(this,t)).handleChange=function(t){i.setState({deviceAddress:t.target.value})},i.handleClick=function(){i.props.addTrip(i.state),i.setState({deviceAddress:""})},i.state={deviceAddress:""},i}return Object(d.a)(n,[{key:"render",value:function(){return Object(g.jsxs)("div",{style:w.form,children:[Object(g.jsx)("input",{value:this.state.text,onChange:this.handleChange,placeholder:"New Trip",style:w.input}),Object(g.jsx)("button",{onClick:this.handleClick,style:w.addButton,children:"Add Trip"})]})}}]),n}(i.Component),O=function(t){Object(l.a)(n,t);var e=Object(f.a)(n);function n(){return Object(u.a)(this,n),e.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var t=this;return Object(g.jsx)("div",{children:this.props.trips.map((function(e){return Object(g.jsxs)("div",{style:w.trip,children:[Object(g.jsx)("p",{children:e.deviceAddress}),Object(g.jsx)("button",{onClick:function(){t.props.deleteTrip(e)},style:w.deleteButton,children:"x"})]},e.id)}))})}}]),n}(i.Component),x=function(t){Object(l.a)(n,t);var e=Object(f.a)(n);function n(t){var i;return Object(u.a)(this,n),(i=e.call(this,t)).deleteTrip=function(){var t=Object(p.a)(c.a.mark((function t(e){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={id:e.id},t.next=3,y.a.graphql(Object(j.b)("\n  mutation DeleteTrip(\n    $input: DeleteTripInput!\n    $condition: ModelTripConditionInput\n  ) {\n    deleteTrip(input: $input, condition: $condition) {\n      id\n      username\n      appId\n      deviceAddress\n      deviceName\n      startTimestamp\n      maxKmsHour\n      numberOfUnlocks\n      sumKms\n      createdAt\n      updatedAt\n    }\n  }\n",{input:n}));case 3:i.setState({trips:i.state.trips.filter((function(t){return t.id!==e.id}))});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),i.addTrip=function(){var t=Object(p.a)(c.a.mark((function t(e){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.a.graphql(Object(j.b)("\n  mutation CreateTrip(\n    $input: CreateTripInput!\n    $condition: ModelTripConditionInput\n  ) {\n    createTrip(input: $input, condition: $condition) {\n      id\n      username\n      appId\n      deviceAddress\n      deviceName\n      startTimestamp\n      maxKmsHour\n      numberOfUnlocks\n      sumKms\n      createdAt\n      updatedAt\n    }\n  }\n",{input:e}));case 2:n=t.sent,i.state.trips.push(n.data.createTrip),i.setState({trips:i.state.trips});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),i.state={trips:[]},i}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var t=Object(p.a)(c.a.mark((function t(){var e;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.a.graphql(Object(j.b)("\n  query ListTrips(\n    $filter: ModelTripFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        username\n        appId\n        deviceAddress\n        deviceName\n        startTimestamp\n        maxKmsHour\n        numberOfUnlocks\n        sumKms\n        createdAt\n        updatedAt\n      }\n      nextToken\n    }\n  }\n"));case 2:e=t.sent,this.setState({trips:e.data.listTrips.items});case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(g.jsxs)("div",{style:w.container,children:[Object(g.jsx)("h1",{children:"Trips App"}),Object(g.jsx)(v,{addTrip:this.addTrip}),Object(g.jsx)(O,{trips:this.state.trips,deleteTrip:this.deleteTrip}),Object(g.jsx)(h.d,{})]})}}]),n}(i.Component),T=Object(b.a)(x),w={container:{width:480,margin:"0 auto",padding:20},form:{display:"flex",marginBottom:15},input:{flexGrow:2,border:"none",backgroundColor:"#ddd",padding:12,fontSize:18},addButton:{backgroundColor:"black",color:"white",outline:"none",padding:12,fontSize:18},trip:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:22,marginBottom:15},deleteButton:{fontSize:18,fontWeight:"bold"}},k=function(t){t&&t instanceof Function&&n.e(35).then(n.bind(null,277)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,a=e.getLCP,s=e.getTTFB;n(t),i(t),r(t),a(t),s(t)}))};s.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(T,{})}),document.getElementById("root")),k()}},[[207,2,3]]]);
//# sourceMappingURL=main.167340fc.chunk.js.map
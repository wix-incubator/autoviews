"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[531],{7587:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=t(7462),o=(t(7294),t(3905));const i={},r="Events",l={unversionedId:"entities/events",id:"entities/events",title:"Events",description:"Each component in ComponentsRepo could emit special events: AutoChangeEvent and AutoClickEvent. Those events contains original event and in addition has schemaPointer and pointer properties which helps understand where is the source of the event.",source:"@site/docs/entities/events.md",sourceDirName:"entities",slug:"/entities/events",permalink:"/autoviews/docs/entities/events",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/website/docs/entities/events.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"UISchema",permalink:"/autoviews/docs/entities/ui-schema"},next:{title:"Repository Components",permalink:"/autoviews/docs/entities/repository-components"}},p={},s=[{value:"AutoChangeEvent",id:"autochangeevent",level:2},{value:"AutoClickEvent",id:"autoclickevent",level:2},{value:"Construcing AutoEventHandler",id:"construcing-autoeventhandler",level:2},{value:"changeEventHandler",id:"changeeventhandler",level:3},{value:"addItemEventHandler",id:"additemeventhandler",level:3},{value:"addFieldEventHandler",id:"addfieldeventhandler",level:3},{value:"removeFieldEventHandler",id:"removefieldeventhandler",level:3},{value:"clickEventHandler",id:"clickeventhandler",level:3}],d={toc:s};function c(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"events"},"Events"),(0,o.kt)("p",null,"Each component in ",(0,o.kt)("inlineCode",{parentName:"p"},"ComponentsRepo")," could emit special events: ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoChangeEvent")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoClickEvent"),". Those events contains original event and in addition has ",(0,o.kt)("inlineCode",{parentName:"p"},"schemaPointer")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"pointer")," properties which helps understand where is the source of the event."),(0,o.kt)("h2",{id:"autochangeevent"},"AutoChangeEvent"),(0,o.kt)("p",null,"When component emits ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoChangeEvent")," it adds ",(0,o.kt)("a",{parentName:"p",href:"https://tools.ietf.org/html/rfc6902"},"JSONPatch")," to it. With it is super easy to handle the state."),(0,o.kt)("p",null,"Check out the ",(0,o.kt)("a",{parentName:"p",href:"/docs/examples/basic"},"Basic Usage example"),"."),(0,o.kt)("h2",{id:"autoclickevent"},"AutoClickEvent"),(0,o.kt)("p",null,"This event, besides ",(0,o.kt)("inlineCode",{parentName:"p"},"schemaPointer")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"pointer")," provides ",(0,o.kt)("inlineCode",{parentName:"p"},"data")," field."),(0,o.kt)("h2",{id:"construcing-autoeventhandler"},"Construcing AutoEventHandler"),(0,o.kt)("h3",{id:"changeeventhandler"},"changeEventHandler"),(0,o.kt)("p",null,"AutoViews provides utilities that can create ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoEventHandler")," that contains ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPatch"),"."),(0,o.kt)("p",null,"In this example we are using ",(0,o.kt)("inlineCode",{parentName:"p"},"changeEventHandler")," utility to construct ",(0,o.kt)("inlineCode",{parentName:"p"},"onChange")," with ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPatch")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import {changeEventHandler} from '@autoviews/core';\n\nconst myRepo = new ComponentsRepo('myRepo');\nmyRepo.register('string', {\n  name: 'myInput',\n  component: props => (\n    <input\n      value={props.data}\n      onChange={changeEventHandler(props, e => e.currentTarget.value)}\n    />\n  )\n});\n")),(0,o.kt)("h3",{id:"additemeventhandler"},"addItemEventHandler"),(0,o.kt)("p",null,"Helper to create ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPatch")," that adds item to the array."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const myRepo = new ComponentsRepo('MyRepo');\nmyRepo.register('array', {\n  name: 'MyArray',\n  component: props => {\n    return (\n      <button onClick={addItemEventHandler(props, () => 'new item')}>\n        Add item\n      </button>\n    );\n  }\n});\n")),(0,o.kt)("h3",{id:"addfieldeventhandler"},"addFieldEventHandler"),(0,o.kt)("p",null,"Helper to create ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPatch")," that adds field to the object."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const myRepo = new ComponentsRepo('MyRepo');\nmyRepo.register('object', {\n  name: 'MyObject',\n  component: props => {\n    return (\n      <button\n        onClick={addFieldEventHandler(\n          props,\n          () => 10,\n          () => 'age'\n        )}\n      >\n        Add field 'age' with value 10\n      </button>\n    );\n  }\n});\n")),(0,o.kt)("h3",{id:"removefieldeventhandler"},"removeFieldEventHandler"),(0,o.kt)("p",null,"Helper to create ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPatch")," that removes field from the object."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const myRepo = new ComponentsRepo('MyRepo');\n// ... register object\n\nmyRepo.register('string', {\n  name: 'MyStringComponent',\n  component: props =>\n    props.data ? (\n      <span>\n        {props.data}\n        <button onClick={removeEventHandler(props)}>remove me</button>\n      </span>\n    ) : null\n});\n")),(0,o.kt)("h3",{id:"clickeventhandler"},"clickEventHandler"),(0,o.kt)("p",null,"Helper to create ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoClickEvent")," with any ",(0,o.kt)("inlineCode",{parentName:"p"},"data"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const myRepo = new ComponentsRepo('MyRepo');\nmyRepo.register('string', {\n  name: 'MyStringComponent',\n  component: props => (\n    <span>\n      {props.data}\n      <button\n        onClick={clickEventHandler({\n          ...props,\n          data: \"hey I've been clicked\"\n        })}\n      >\n        Click me\n      </button>\n    </span>\n  )\n});\n")))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=f7f1d636.df7b6f9d.js.map
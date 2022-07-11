"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[9],{2107:function(n,e,t){t.d(e,{B:function(){return s}});var o=t(7294),i=t(2070),a=t(524),r={"@autoviews/core":"latest"};function s(n){var e=(0,a.I)().colorMode;return o.createElement(i.xR,{theme:e,template:"react-ts",customSetup:{files:n.files,dependencies:Object.assign({},r,n.dependencies)},options:Object.assign({showNavigator:!0,editorHeight:500,externalResources:["https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap","https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]},n.options)})}},1239:function(n,e,t){t.r(e),t.d(e,{assets:function(){return k},contentTitle:function(){return d},default:function(){return w},frontMatter:function(){return u},metadata:function(){return v},toc:function(){return f}});var o={};t.r(o),t.d(o,{dependencies:function(){return p},files:function(){return c},options:function(){return l}});var i=t(5773),a=t(808),r=(t(7294),t(3905)),s=t(2107),c={"/App.tsx":"import React from 'react';\nimport {\n    RepositoryProvider,\n    AutoView,\n    CoreSchemaMetaSchema,\n    AutoEventHandler,\n    AutoEvent\n} from '@autoviews/core';\nimport {set} from 'json-pointer';\nimport {Box} from '@mui/material';\n\nimport {data} from './data';\nimport schema from './schema.json';\nimport {repo} from './repo';\n\ntype ActiveStateClickEvent = AutoEvent & {data: {type: string; value: boolean}};\n\nexport default function App() {\n    const [currentData, setData] = React.useState(data);\n\n    const clickHandler: AutoEventHandler<ActiveStateClickEvent> = (\n        _,\n        {pointer, data}\n    ) => {\n        if (data.type !== 'CHANGE_ACTIVE_STATE') {\n            return;\n        }\n\n        const newDocument = [...currentData];\n        set(newDocument, pointer, data.value);\n        setData(newDocument);\n    };\n\n    return (\n        <>\n            <Box sx={{margin: '20px 16px'}}>\n                Click on the status to change it:\n            </Box>\n            <RepositoryProvider components={repo}>\n                <AutoView\n                    schema={schema as CoreSchemaMetaSchema}\n                    data={currentData}\n                    onClick={clickHandler}\n                />\n            </RepositoryProvider>\n        </>\n    );\n}\n","/repo.tsx":"import React from 'react';\nimport {\n    ComponentsRepo,\n    AutoFields,\n    AutoItems,\n    clickEventHandler\n} from '@autoviews/core';\nimport {Box, List, ListItem, ListItemText, Chip, Divider} from '@mui/material';\n\nexport const repo = new ComponentsRepo('MyListRepo')\n    .register('array', {\n        name: 'MyList',\n        component: props => (\n            <Box\n                component=\"form\"\n                sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}\n                noValidate\n                autoComplete=\"off\"\n            >\n                <List\n                    sx={{bgcolor: 'background.paper'}}\n                    dense\n                >\n                    <AutoItems {...props} />\n                </List>\n            </Box>\n        )\n    })\n    .register('object', {\n        name: 'MyObject',\n        component: props => (\n            <>\n                <ListItem>\n                    <AutoFields\n                        pick={['login', 'active']}\n                        {...props}\n                    />\n                </ListItem>\n                <Divider component=\"li\" />\n            </>\n        )\n    })\n    .register('string', {\n        name: 'MyStringComponent',\n        component: props => <ListItemText>{props.data}</ListItemText>\n    })\n    .register('boolean', {\n        name: 'MyBooleanComponent',\n        component: props => (\n            <Chip\n                label={props.data ? 'online' : 'offline'}\n                color={props.data ? 'success' : 'error'}\n                onClick={clickEventHandler({\n                    onClick: props.onClick,\n                    pointer: props.pointer,\n                    schemaPointer: props.schemaPointer,\n                    data: {\n                        type: 'CHANGE_ACTIVE_STATE',\n                        value: !props.data\n                    }\n                })}\n            />\n        )\n    });\n","/schema.json":'{\n  "type": "array",\n  "items": {\n    "type": "object",\n    "properties": {\n      "login": {\n        "type": "string"\n      },\n      "age": {\n        "type": "number"\n      },\n      "active": {\n        "type": "boolean"\n      }\n    }\n  }\n}\n',"/data.js":"export const data = [\n    {\n        login: 'johondoe',\n        age: 21,\n        active: true\n    },\n    {\n        login: 'janedoe',\n        age: 20,\n        active: false\n    }\n];\n"},p={"json-pointer":"^0.6.1","@mui/material":"^5.3.1","@emotion/react":"^11.7.1","@emotion/styled":"^11.6.0",lodash:"^4.17.21"},l={activePath:"/App.tsx"},m=["components"],u={},d="onClick usage",v={unversionedId:"examples/onclick",id:"examples/onclick",title:"onClick usage",description:"By this example you can learn how to work with click events inside ` component. As well as how to use clickEventHandler utility to construct desired onClick` event callback function.",source:"@site/docs/examples/onclick.md",sourceDirName:"examples",slug:"/examples/onclick",permalink:"/autoviews/docs/examples/onclick",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/website/docs/examples/onclick.md",tags:[],version:"current",frontMatter:{},sidebar:"examples",previous:{title:"Showcase",permalink:"/autoviews/docs/examples/showcase"},next:{title:"Switch ComponentsRepo",permalink:"/autoviews/docs/examples/switch-repo"}},k={},f=[],h={toc:f};function w(n){var e=n.components,t=(0,a.Z)(n,m);return(0,r.kt)("wrapper",(0,i.Z)({},h,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"onclick-usage"},"onClick usage"),(0,r.kt)("p",null,"By this example you can learn how to work with ",(0,r.kt)("inlineCode",{parentName:"p"},"click")," events inside ",(0,r.kt)("inlineCode",{parentName:"p"},"<Autoview />")," component. As well as how to use ",(0,r.kt)("a",{parentName:"p",href:"/docs/entities/events#clickeventhandler"},"clickEventHandler")," utility to construct desired ",(0,r.kt)("inlineCode",{parentName:"p"},"onClick")," event callback function."),(0,r.kt)(s.B,(0,i.Z)({},o,{mdxType:"Demo"})))}w.isMDXComponent=!0}}]);
//# sourceMappingURL=0ef6f249.7a435ee5.js.map
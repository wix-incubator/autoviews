"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[680],{2107:function(n,e,t){t.d(e,{B:function(){return s}});var o=t(7294),a=t(2070),r=t(524),i={"@autoviews/core":"latest"};function s(n){var e=(0,r.I)().colorMode;return o.createElement(a.xR,{theme:e,template:"react-ts",customSetup:{files:n.files,dependencies:Object.assign({},i,n.dependencies)},options:Object.assign({showNavigator:!0,editorHeight:500,externalResources:["https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap","https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]},n.options)})}},2472:function(n,e,t){t.r(e),t.d(e,{assets:function(){return v},contentTitle:function(){return d},default:function(){return C},frontMatter:function(){return u},metadata:function(){return h},toc:function(){return w}});var o={};t.r(o),t.d(o,{dependencies:function(){return c},files:function(){return p},options:function(){return m}});var a=t(5773),r=t(808),i=(t(7294),t(3905)),s=t(2107),p={"/App.tsx":"import React from 'react';\nimport {\n    RepositoryProvider,\n    AutoView,\n    CoreSchemaMetaSchema,\n    AutoEventHandler,\n    AutoEvent\n} from '@autoviews/core';\nimport {set} from 'json-pointer';\nimport {applyPatch} from 'fast-json-patch';\n\nimport {data} from './data';\nimport schema from './schema.json';\nimport {repo} from './list-repo';\n\nexport type MyClickEvent = AutoEvent & {data: {type: string; value?: any}};\n\nexport default function App() {\n    const [currentData, setData] = React.useState(data);\n\n    const clickHandler = React.useCallback<AutoEventHandler<MyClickEvent>>(\n        (_, {pointer, data}) => {\n            switch (data.type) {\n                case 'SAVE_ITEM': {\n                    setData([\n                        ...applyPatch(currentData, data.value).newDocument\n                    ]);\n                    break;\n                }\n\n                case 'CHANGE_ACTIVE_STATE': {\n                    const newDocument = [...currentData];\n                    set(newDocument, pointer, data.value);\n                    setData(newDocument);\n                    break;\n                }\n            }\n        },\n        [currentData, setData]\n    );\n\n    return (\n        <RepositoryProvider components={repo}>\n            <AutoView\n                schema={schema as CoreSchemaMetaSchema}\n                data={currentData}\n                onClick={clickHandler}\n            />\n        </RepositoryProvider>\n    );\n}\n","/ListItem.tsx":"import React, {useState} from 'react';\nimport {Operation} from 'fast-json-patch';\nimport {\n    AutoViewProps,\n    AutoFields,\n    RepositoryProvider,\n    AutoEventHandler,\n    AutoChangeEvent,\n    clickEventHandler\n} from '@autoviews/core';\nimport {ListItem as MUIListItem, Divider, Button, Stack} from '@mui/material';\n\nimport {repo} from './item-repo';\n\nexport const ListItem: React.ComponentType<AutoViewProps> = props => {\n    const [view, setView] = useState<'item' | 'listItem'>('listItem');\n    const [patches, setPatches] = useState<Operation[]>([]);\n\n    const changeHandler = React.useCallback<AutoEventHandler<AutoChangeEvent>>(\n        (_, {patch}) => {\n            setPatches(patches.concat(patch));\n        },\n        [patches, setPatches]\n    );\n\n    const saveHandler = clickEventHandler({\n        ...props,\n        data: {type: 'SAVE_ITEM', value: patches}\n    });\n\n    switch (view) {\n        case 'listItem': {\n            return (\n                <>\n                    <MUIListItem>\n                        <AutoFields\n                            {...props}\n                            pick={['login', 'active']}\n                        />\n                        <Button\n                            variant=\"text\"\n                            onClick={() => {\n                                setView('item');\n                            }}\n                            sx={{margin: '0 10px'}}\n                        >\n                            Edit\n                        </Button>\n                    </MUIListItem>\n                    <Divider component=\"li\" />\n                </>\n            );\n        }\n        case 'item': {\n            return (\n                <RepositoryProvider components={repo}>\n                    <AutoFields\n                        {...props}\n                        onChange={changeHandler}\n                    />\n                    <Stack\n                        direction=\"row\"\n                        spacing={2}\n                        sx={{margin: '20px 0'}}\n                    >\n                        <Button\n                            variant=\"contained\"\n                            color=\"success\"\n                            onClick={e => {\n                                setView('listItem');\n                                saveHandler(e);\n                            }}\n                        >\n                            Save\n                        </Button>\n                        <Button\n                            color=\"secondary\"\n                            onClick={() => {\n                                setView('listItem');\n                                setPatches([]);\n                            }}\n                        >\n                            Discard\n                        </Button>\n                    </Stack>\n                    <Divider />\n                </RepositoryProvider>\n            );\n        }\n    }\n};\n","/list-repo.tsx":"import React from 'react';\nimport {ComponentsRepo, AutoItems, clickEventHandler} from '@autoviews/core';\nimport {Box, List, ListItemText, Chip} from '@mui/material';\n\nimport {ListItem} from './ListItem';\n\nexport const repo = new ComponentsRepo('MyListRepo')\n    .register('array', {\n        name: 'MyList',\n        component: props => (\n            <Box\n                component=\"form\"\n                sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}\n                noValidate\n                autoComplete=\"off\"\n            >\n                <List\n                    sx={{bgcolor: 'background.paper'}}\n                    dense\n                >\n                    <AutoItems {...props} />\n                </List>\n            </Box>\n        )\n    })\n    .register('object', {\n        name: 'MyObject',\n        component: ListItem\n    })\n    .register('string', {\n        name: 'MyStringComponent',\n        component: props => <ListItemText>{props.data}</ListItemText>\n    })\n    .register('boolean', {\n        name: 'MyBooleanComponent',\n        component: props => (\n            <Chip\n                label={props.data ? 'online' : 'offline'}\n                color={props.data ? 'success' : 'error'}\n                onClick={clickEventHandler({\n                    onClick: props.onClick,\n                    pointer: props.pointer,\n                    schemaPointer: props.schemaPointer,\n                    data: {\n                        type: 'CHANGE_ACTIVE_STATE',\n                        value: !props.data\n                    }\n                })}\n            />\n        )\n    });\n","/item-repo.tsx":"import React from 'react';\nimport {ComponentsRepo, AutoFields, changeEventHandler} from '@autoviews/core';\nimport {TextField, Switch, FormControlLabel, Box} from '@mui/material';\n\nexport const repo = new ComponentsRepo('MyItemRepo')\n    .register('object', {\n        name: 'MyObjectForm',\n        component: AutoFields\n    })\n    .register('string', {\n        name: 'MyStringInputComponent',\n        component: props => (\n            <TextField\n                defaultValue={props.data}\n                onChange={changeEventHandler(props, e => e.target.value)}\n            />\n        )\n    })\n    .register('number', {\n        name: 'MyNumberInputComponent',\n        component: props => (\n            <TextField\n                type=\"number\"\n                defaultValue={props.data}\n                onChange={changeEventHandler(props, e => e.target.value)}\n            />\n        )\n    })\n    .register('boolean', {\n        name: 'MyBooleanInputComponent',\n        component: props => (\n            <Box>\n                <FormControlLabel\n                    control={<Switch defaultChecked={props.data} />}\n                    label=\"Status\"\n                    onChange={changeEventHandler(props, () => !props.data)}\n                />\n            </Box>\n        )\n    });\n","/schema.json":'{\n  "type": "array",\n  "items": {\n    "type": "object",\n    "properties": {\n      "login": {\n        "type": "string"\n      },\n      "age": {\n        "type": "number"\n      },\n      "active": {\n        "type": "boolean"\n      }\n    }\n  }\n}\n',"/data.js":"export const data = [\n    {\n        login: 'johondoe',\n        age: 21,\n        active: true\n    },\n    {\n        login: 'janedoe',\n        age: 20,\n        active: false\n    }\n];\n"},c={"fast-json-patch":"^3.1.0","@mui/material":"^5.3.1","@emotion/react":"^11.7.1","@emotion/styled":"^11.6.0"},m={activePath:"/App.tsx"},l=["components"],u={},d="Switch ComponentsRepo",h={unversionedId:"examples/switch-repo",id:"examples/switch-repo",title:"Switch ComponentsRepo",description:"Here we extended our simple onClick example with Edit button which opens item view as form.",source:"@site/docs/examples/switch-repo.md",sourceDirName:"examples",slug:"/examples/switch-repo",permalink:"/autoviews/docs/examples/switch-repo",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/website/docs/examples/switch-repo.md",tags:[],version:"current",frontMatter:{},sidebar:"examples",previous:{title:"onClick usage",permalink:"/autoviews/docs/examples/onclick"}},v={},w=[],f={toc:w};function C(n){var e=n.components,t=(0,r.Z)(n,l);return(0,i.kt)("wrapper",(0,a.Z)({},f,t,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"switch-componentsrepo"},"Switch ComponentsRepo"),(0,i.kt)("p",null,"Here we extended our simple ",(0,i.kt)("a",{parentName:"p",href:"./onclick"},"onClick")," example with ",(0,i.kt)("inlineCode",{parentName:"p"},"Edit")," button which opens item view as form."),(0,i.kt)("p",null,"We made ",(0,i.kt)("inlineCode",{parentName:"p"},"ListItem")," component, which we are using in ",(0,i.kt)("inlineCode",{parentName:"p"},"list-repo.tsx")," for each object in our users array."),(0,i.kt)("p",null,"It has internal state, that reflects how to display item: as list item or as form by providing new ",(0,i.kt)("inlineCode",{parentName:"p"},"ComponentsRepo")," in case we want to render a form view."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ListItem")," in it's state collects a list of ",(0,i.kt)("inlineCode",{parentName:"p"},"JSONPatch")," objects and by clicking on ",(0,i.kt)("inlineCode",{parentName:"p"},"Save")," button we apply those patches in ",(0,i.kt)("inlineCode",{parentName:"p"},"clickHandler")," at the ",(0,i.kt)("inlineCode",{parentName:"p"},"App.tsx"),"."),(0,i.kt)(s.B,(0,a.Z)({},o,{mdxType:"Demo"})))}C.isMDXComponent=!0}}]);
//# sourceMappingURL=28e06290.882cdeac.js.map
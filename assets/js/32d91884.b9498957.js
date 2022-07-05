"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[567],{2107:function(n,e,t){t.d(e,{B:function(){return i}});var o=t(7294),a=t(9544),r=t(524),s={"@autoviews/core":"latest"};function i(n){var e=(0,r.I)().colorMode;return o.createElement(a.xR,{theme:e,template:"react-ts",customSetup:{files:n.files,dependencies:Object.assign({},s,n.dependencies)},options:Object.assign({showNavigator:!0,editorHeight:500,externalResources:["https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap","https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]},n.options)})}},2681:function(n,e,t){t.r(e),t.d(e,{assets:function(){return y},contentTitle:function(){return b},default:function(){return x},frontMatter:function(){return g},metadata:function(){return C},toc:function(){return w}});var o={};t.r(o),t.d(o,{dependencies:function(){return l},files:function(){return c},options:function(){return u}});var a={};t.r(a),t.d(a,{dependencies:function(){return h},files:function(){return d},options:function(){return f}});var r,s=t(7896),i=t(1461),p=(t(7294),t(3905)),m=t(2107),c={"/App.tsx":"import React from 'react';\nimport {\n    AutoView,\n    RepositoryProvider,\n    CoreSchemaMetaSchema\n} from '@autoviews/core';\n\nimport schema from './schema.json';\nimport {repo} from './repo';\n\nexport const App = () => {\n    const [value, setValue] = React.useState({});\n    const onChange = React.useCallback(e => setValue(e.target.value), []);\n\n    return (\n        <RepositoryProvider components={repo}>\n            <AutoView\n                schema={schema as CoreSchemaMetaSchema}\n                data={value}\n                onChange={onChange}\n            />\n        </RepositoryProvider>\n    );\n};\n\nexport default App;\n","/repo.tsx":"import React from 'react';\nimport {\n    AutoView,\n    AutoViewProps,\n    ComponentsRepo,\n    AutoFields,\n    RepositoryComponentByType,\n    changeEventHandler\n} from '@autoviews/core';\nimport {\n    TextField,\n    FormControl,\n    FormLabel,\n    RadioGroup,\n    FormControlLabel,\n    Radio\n} from '@mui/material';\n\nconst StringComponent: React.FC<AutoViewProps> = props => (\n    <FormControl\n        fullWidth\n        margin=\"normal\"\n    >\n        <TextField\n            variant=\"outlined\"\n            label={props.schema.title}\n            value={props.data}\n            onChange={changeEventHandler(props, e => e.target.value)}\n        />\n    </FormControl>\n);\n\nconst ObjectComponent: React.FC<AutoViewProps> = props => (\n    <>\n        {props.schema.oneOf && (\n            <RepositoryComponentByType\n                type={customOneOfType}\n                {...props}\n            />\n        )}\n        <AutoFields {...props} />\n    </>\n);\n\nconst OneOfAsEnumComponent: React.FC<AutoViewProps> = props => (\n    <FormControl\n        fullWidth\n        margin=\"normal\"\n    >\n        <FormLabel id={props.schema.title}>{props.schema.title}</FormLabel>\n        <RadioGroup\n            row\n            name={props.schema.title}\n            onChange={changeEventHandler(props, e => e.target.value)}\n            defaultValue={props.schema.oneOf[0].const}\n        >\n            {props.schema.oneOf!.map(item => (\n                <FormControlLabel\n                    key={item.const}\n                    value={item.const}\n                    control={<Radio />}\n                    label={item.title}\n                />\n            ))}\n        </RadioGroup>\n    </FormControl>\n);\n\nconst customOneOfType = Symbol('customOneOf');\nconst CustomOneOfComponent: React.FC<AutoViewProps> = props => {\n    const [option, setOption] = React.useState(0);\n\n    const onChange = React.useCallback<\n        React.ChangeEventHandler<HTMLSelectElement>\n    >(\n        e => {\n            setOption(parseInt(e.target.value, 10));\n        },\n        [setOption]\n    );\n\n    const optionSchema = {\n        title: 'Select contact',\n        oneOf: props.schema.oneOf?.map((_, index) => ({\n            const: index,\n            title: `Option #${index + 1}`\n        }))\n    };\n\n    return (\n        <>\n            <AutoView\n                {...props}\n                schema={optionSchema}\n                onChange={onChange}\n                data={option}\n            />\n            <AutoFields\n                {...props}\n                schema={{...props.schema, ...props.schema.oneOf![option]}}\n            />\n        </>\n    );\n};\n\nexport const repo = new ComponentsRepo('oneof-inside-object-repo', node => {\n    if ('type' in node) {\n        return node.type;\n    }\n\n    if ('oneOf' in node) {\n        return 'oneOf';\n    }\n})\n    .register('string', {\n        name: 'string',\n        component: StringComponent\n    })\n    .register('number', {\n        name: 'number',\n        component: StringComponent\n    })\n    .register('object', {\n        name: 'object',\n        component: ObjectComponent\n    })\n    .register('oneOf', {\n        name: 'oneOfAsEnum',\n        component: OneOfAsEnumComponent\n    })\n    .register(customOneOfType, {\n        name: 'oneOf',\n        component: CustomOneOfComponent\n    });\n","/schema.json":'{\n  "title": "Some form",\n  "type": "object",\n  "properties": {\n    "firstName": {\n      "type": "string",\n      "title": "First name"\n    },\n    "lastName": {\n      "type": "string",\n      "title": "Last name"\n    }\n  },\n  "oneOf": [\n    {\n      "properties": {\n        "homePhone": {\n          "type": "number",\n          "title": "Home phone"\n        }\n      },\n      "required": ["homePhone"]\n    },\n    {\n      "properties": {\n        "mobilePhone": {\n          "type": "number",\n          "title": "Mobile phone"\n        }\n      },\n      "required": ["mobilePhone"]\n    }\n  ]\n}\n'},l={"fast-json-patch":"^3.1.0","@mui/material":"^5.3.1","@emotion/react":"^11.7.1","@emotion/styled":"^11.6.0"},u={activePath:"/App.tsx"},d={"/App.tsx":"import React from 'react';\nimport {\n    AutoView,\n    RepositoryProvider,\n    CoreSchemaMetaSchema\n} from '@autoviews/core';\nimport {Box, Typography} from '@mui/material';\n\nimport schema from './schema.json';\nimport {repo} from './repo';\n\nconst App = () => {\n    const [value, setValue] = React.useState<string>('');\n    const onChange = React.useCallback(e => setValue(e.target.value), []);\n\n    return (\n        <>\n            <RepositoryProvider components={repo}>\n                <AutoView\n                    schema={schema as CoreSchemaMetaSchema}\n                    data={value}\n                    onChange={onChange}\n                />\n            </RepositoryProvider>\n            {value && (\n                <>\n                    <Typography>\n                        <Box\n                            sx={{marginTop: '20px'}}\n                            style={{display: 'flex', alignItems: 'center'}}\n                        >\n                            <span>You just selected</span>\n                            <span\n                                style={{\n                                    background: value,\n                                    display: 'block',\n                                    width: '16px',\n                                    height: '16px',\n                                    margin: '0 10px',\n                                    borderRadius: '4px'\n                                }}\n                            />\n                        </Box>\n                    </Typography>\n                </>\n            )}\n        </>\n    );\n};\n\nexport default App;\n","/repo.tsx":"import React from 'react';\nimport {ComponentsRepo, changeEventHandler, AutoFields} from '@autoviews/core';\nimport {FormControl, InputLabel, Select, MenuItem} from '@mui/material';\n\nexport const repo = new ComponentsRepo('enum-repo', node => {\n    if ('type' in node) {\n        return node.type;\n    }\n\n    if ('oneOf' in node) {\n        return 'oneOf';\n    }\n\n    throw new Error('cannot resolve type');\n});\n\nrepo.register('object', {\n    name: 'object',\n    component: AutoFields\n});\n\nrepo.register('oneOf', {\n    name: 'oneOfAsEnum',\n    component: props => (\n        <FormControl fullWidth>\n            <InputLabel id={props.schema.title}>\n                {props.schema.title}\n            </InputLabel>\n            <Select\n                labelId={props.schema.title}\n                id=\"select\"\n                value={props.data}\n                label={props.schema.title}\n                onChange={changeEventHandler(props, e => e.target.value)}\n            >\n                {props.schema.oneOf!.map(item => (\n                    <MenuItem\n                        key={item.const}\n                        value={item.const}\n                    >\n                        {item.title}\n                    </MenuItem>\n                ))}\n            </Select>\n        </FormControl>\n    )\n});\n","/schema.json":'{\n  "title": "Form",\n  "type": "object",\n  "properties": {\n    "color": {\n      "title": "Favorite color",\n      "oneOf": [\n        {\n          "const": "#c0c0c0",\n          "title": "Silver"\n        },\n        {\n          "const": "#ff00ff",\n          "title": "Fuchsia"\n        },\n        {\n          "const": "#00ff00",\n          "title": "Lime"\n        },\n        {\n          "const": "#800000",\n          "title": "Maroon"\n        },\n        {\n          "const": "#008080",\n          "title": "Teal"\n        }\n      ]\n    }\n  }\n}\n'},h={"fast-json-patch":"^3.1.0","@mui/material":"^5.3.1","@emotion/react":"^11.7.1","@emotion/styled":"^11.6.0"},f={activePath:"/App.tsx"},v=["components"],g={},b="oneOf",C={unversionedId:"subschemas/combiners-oneof",id:"subschemas/combiners-oneof",title:"oneOf",description:"Enum with titles",source:"@site/docs/subschemas/combiners-oneof.md",sourceDirName:"subschemas",slug:"/subschemas/combiners-oneof",permalink:"/autoviews/docs/subschemas/combiners-oneof",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/packages/website/docs/subschemas/combiners-oneof.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"if/then/else",permalink:"/autoviews/docs/subschemas/conditions"},next:{title:"$ref",permalink:"/autoviews/docs/subschemas/combiners-ref"}},y={},w=[{value:"Enum with titles",id:"enum-with-titles",level:2},{value:"OneOf inside object",id:"oneof-inside-object",level:2}],O=(r="CustomOneOfComponent",function(n){return console.warn("Component "+r+" was not imported, exported, or provided by MDXProvider as global scope"),(0,p.kt)("div",n)}),k={toc:w};function x(n){var e=n.components,t=(0,i.Z)(n,v);return(0,p.kt)("wrapper",(0,s.Z)({},k,t,{components:e,mdxType:"MDXLayout"}),(0,p.kt)("h1",{id:"oneof"},"oneOf"),(0,p.kt)("h2",{id:"enum-with-titles"},"Enum with titles"),(0,p.kt)("p",null,"Where dropdown render is needed, ",(0,p.kt)("inlineCode",{parentName:"p"},"enum")," is the first thing that come to mind. Unfortunately, it's lack of titles functionality (enumNames ",(0,p.kt)("a",{parentName:"p",href:"https://github.com/rjsf-team/react-jsonschema-form/issues/532"},"proposal")," wasn't accepted).\nIn this case, ",(0,p.kt)("inlineCode",{parentName:"p"},"oneOf")," + ",(0,p.kt)("inlineCode",{parentName:"p"},"const")," is here to the rescue."),(0,p.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,p.kt)("div",{parentName:"div",className:"admonition-heading"},(0,p.kt)("h5",{parentName:"div"},(0,p.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,p.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,p.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,p.kt)("div",{parentName:"div",className:"admonition-content"},(0,p.kt)("p",{parentName:"div"},"In this example, schema's node with ",(0,p.kt)("inlineCode",{parentName:"p"},"oneOf")," doesn't contain ",(0,p.kt)("inlineCode",{parentName:"p"},"type")," keyword, so repo's ",(0,p.kt)("inlineCode",{parentName:"p"},"getNodeType")," must return ",(0,p.kt)("inlineCode",{parentName:"p"},"oneOf")," type in order to render registered component automatically.\nAlternatively, ",(0,p.kt)("inlineCode",{parentName:"p"},"<RepositoryComponentByType />")," could be used to render ",(0,p.kt)("inlineCode",{parentName:"p"},"oneOf")," component manually inside object component."))),(0,p.kt)(m.B,(0,s.Z)({},a,{mdxType:"Demo"})),(0,p.kt)("h2",{id:"oneof-inside-object"},"OneOf inside object"),(0,p.kt)("p",null,"Common example with form, where only one field is required (",(0,p.kt)("inlineCode",{parentName:"p"},"homePhone")," or ",(0,p.kt)("inlineCode",{parentName:"p"},"mobilePhone"),")."),(0,p.kt)("p",null,"This examples have two different oneOf components, one the same as in previous example, and second one, which is rendered manually as part of object type."),(0,p.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,p.kt)("div",{parentName:"div",className:"admonition-heading"},(0,p.kt)("h5",{parentName:"div"},(0,p.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,p.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,p.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,p.kt)("div",{parentName:"div",className:"admonition-content"},(0,p.kt)("p",{parentName:"div"},"Note, here ",(0,p.kt)(O,{mdxType:"CustomOneOfComponent"})," contains some JSON Schema generation, which could passed to AutoView to automatically render dropdown with registered in repo component."))),(0,p.kt)(m.B,(0,s.Z)({},o,{mdxType:"Demo"})))}x.isMDXComponent=!0}}]);
//# sourceMappingURL=32d91884.b9498957.js.map
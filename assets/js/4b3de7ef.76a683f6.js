"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[4],{2107:function(n,e,t){t.d(e,{B:function(){return i}});var o=t(7294),s=t(9544),a=t(524),r={"@autoviews/core":"latest"};function i(n){var e=(0,a.I)().colorMode;return o.createElement(s.xR,{theme:e,template:"react-ts",customSetup:{files:n.files,dependencies:Object.assign({},r,n.dependencies)},options:Object.assign({showNavigator:!0,editorHeight:500,externalResources:["https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap","https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]},n.options)})}},9032:function(n,e,t){t.r(e),t.d(e,{assets:function(){return h},contentTitle:function(){return d},default:function(){return y},frontMatter:function(){return l},metadata:function(){return f},toc:function(){return b}});var o={};t.r(o),t.d(o,{dependencies:function(){return p},files:function(){return c},options:function(){return m}});var s=t(7896),a=t(1461),r=(t(7294),t(3905)),i=t(2107),c={"/App.tsx":"import React from 'react';\nimport {\n    AutoView,\n    RepositoryProvider,\n    CoreSchemaMetaSchema\n} from '@autoviews/core';\n\nimport schema from './schema.json';\nimport data from './data.json';\nimport {repo} from './repo';\n\nconst App = () => {\n    const [value, setValue] = React.useState(data);\n    const onChange = React.useCallback(e => {\n        setValue({cats: e.target.value});\n    }, []);\n\n    return (\n        <RepositoryProvider components={repo}>\n            <AutoView\n                schema={schema as CoreSchemaMetaSchema}\n                data={value}\n                onChange={onChange}\n            />\n        </RepositoryProvider>\n    );\n};\n\nexport default App;\n","/repo.tsx":"import React from 'react';\nimport {\n    ComponentsRepo,\n    changeEventHandler,\n    AutoFields,\n    RepositoryComponentByType,\n    AutoViewProps,\n    useRepositoryContext\n} from '@autoviews/core';\nimport {\n    FormControl,\n    Select,\n    MenuItem,\n    InputLabel,\n    TextField,\n    Box\n} from '@mui/material';\n\nconst customIfType = Symbol('if/then/else');\n\nexport const repo = new ComponentsRepo('conditions-repo', node => {\n    if ('type' in node) {\n        return node.type;\n    }\n\n    if ('oneOf' in node) {\n        return 'oneOf';\n    }\n\n    throw new Error('cannot resolve type');\n});\n\nconst ObjectComponent: React.FC<AutoViewProps> = props => (\n    <>\n        <AutoFields {...props} />\n        {props.schema.if && (\n            <RepositoryComponentByType\n                type={customIfType}\n                {...props}\n            />\n        )}\n    </>\n);\n\nconst OneOfAsEnumComponent: React.FC<AutoViewProps> = props => (\n    <FormControl fullWidth>\n        <InputLabel id=\"select-label\">{props.schema.title}</InputLabel>\n        <Select\n            labelId=\"select-label\"\n            id=\"select\"\n            value={props.data}\n            label={props.schema.title}\n            onChange={changeEventHandler(props, e => e.target.value)}\n        >\n            {props.schema.oneOf!.map(item => (\n                <MenuItem\n                    value={item.const}\n                    key={item.const}\n                >\n                    {item.title}\n                </MenuItem>\n            ))}\n        </Select>\n    </FormControl>\n);\n\nconst IfThenElseComponent: React.FC<AutoViewProps> = ({\n    schema,\n    data,\n    ...otherProps\n}) => {\n    const {validator} = useRepositoryContext();\n\n    const {if: ifStatement, then: thenStatement, else: elseStatement} = schema;\n\n    if (!ifStatement || !thenStatement) {\n        throw new Error(\n            'IfThenElseComponent cannot be invoked without `if` and `then` properties in schema'\n        );\n    }\n\n    if (validator.compile(ifStatement)(data)) {\n        return (\n            <AutoFields\n                {...otherProps}\n                data={data}\n                schema={{type: 'object', ...thenStatement}}\n                validation={false}\n            />\n        );\n    }\n\n    if (elseStatement) {\n        return (\n            <AutoFields\n                {...otherProps}\n                data={data}\n                schema={elseStatement}\n                validation={false}\n            />\n        );\n    }\n\n    return null;\n};\n\nrepo.register('object', {\n    name: 'object',\n    component: ObjectComponent\n})\n    .register('number', {\n        name: 'numberInput',\n        component: ({schema}) => (\n            <Box sx={{margin: '20px 0'}}>\n                <TextField\n                    id=\"cats_qty\"\n                    type=\"number\"\n                    variant=\"outlined\"\n                    label={schema.title}\n                />\n            </Box>\n        )\n    })\n    .register(customIfType, {\n        name: 'if/then/else',\n        component: IfThenElseComponent\n    })\n    .register('oneOf', {\n        name: 'oneOfAsEnum',\n        component: OneOfAsEnumComponent\n    });\n","/schema.json":'{\n  "type": "object",\n  "required": ["cats"],\n  "properties": {\n    "cats": {\n      "title": "Do you have cats?",\n      "oneOf": [\n        {\n          "const": true,\n          "title": "Yes"\n        },\n        {\n          "const": false,\n          "title": "No"\n        }\n      ]\n    }\n  },\n  "if": {\n    "properties": {\n      "cats": {\n        "const": true\n      }\n    }\n  },\n  "then": {\n    "properties": {\n      "numberOfCats": {\n        "title": "Enter number of cats",\n        "type": "number"\n      }\n    },\n    "required": ["cats", "numberOfCats"]\n  }\n}\n',"/data.json":'{\n  "cats": false\n}\n'},p={"fast-json-patch":"^3.1.0","@mui/material":"^5.3.1","@emotion/react":"^11.7.1","@emotion/styled":"^11.6.0"},m={activePath:"/App.tsx"},u=["components"],l={},d="if/then/else",f={unversionedId:"subschemas/conditions",id:"subschemas/conditions",title:"if/then/else",description:"This keywords allows to apply subschemas conditionally.",source:"@site/docs/subschemas/conditions.md",sourceDirName:"subschemas",slug:"/subschemas/conditions",permalink:"/autoviews/docs/subschemas/conditions",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/packages/website/docs/subschemas/conditions.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"Subschemas",permalink:"/autoviews/docs/subschemas/"},next:{title:"oneOf",permalink:"/autoviews/docs/subschemas/combiners-oneof"}},h={},b=[{value:"Basic example",id:"basic-example",level:2}],v={toc:b};function y(n){var e=n.components,t=(0,a.Z)(n,u);return(0,r.kt)("wrapper",(0,s.Z)({},v,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"ifthenelse"},"if/then/else"),(0,r.kt)("p",null,"This keywords allows to apply subschemas conditionally."),(0,r.kt)("h2",{id:"basic-example"},"Basic example"),(0,r.kt)(i.B,(0,s.Z)({},o,{mdxType:"Demo"})))}y.isMDXComponent=!0}}]);
//# sourceMappingURL=4b3de7ef.76a683f6.js.map
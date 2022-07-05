"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[985],{2107:function(e,n,t){t.d(n,{B:function(){return i}});var o=t(7294),r=t(9544),a=t(524),s={"@autoviews/core":"latest"};function i(e){var n=(0,a.I)().colorMode;return o.createElement(r.xR,{theme:n,template:"react-ts",customSetup:{files:e.files,dependencies:Object.assign({},s,e.dependencies)},options:Object.assign({showNavigator:!0,editorHeight:500,externalResources:["https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap","https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]},e.options)})}},5766:function(e,n,t){t.r(n),t.d(n,{assets:function(){return f},contentTitle:function(){return h},default:function(){return k},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return g}});var o={};t.r(o),t.d(o,{dependencies:function(){return m},files:function(){return p},options:function(){return c}});var r=t(7896),a=t(1461),s=(t(7294),t(3905)),i=t(2107),p={"/App.tsx":"import React from 'react';\nimport {\n    AutoView,\n    RepositoryProvider,\n    CoreSchemaMetaSchema,\n    createUISchema\n} from '@autoviews/core';\nimport {Box} from '@mui/material';\n\nimport userSchema from './UserSchema.json';\nimport bookSchema from './BookSchema.json';\nimport data from './data.json';\nimport {repo} from './repo';\n\nconst uiSchema = createUISchema({\n    [repo.name]: {\n        '/properties/name': {\n            name: 'title'\n        }\n    }\n});\n\nconst App = () => {\n    return (\n        <Box>\n            <RepositoryProvider\n                components={repo}\n                schemas={[userSchema, bookSchema] as CoreSchemaMetaSchema[]}\n            >\n                <AutoView\n                    uiSchema={uiSchema}\n                    schema={bookSchema as CoreSchemaMetaSchema}\n                    data={data}\n                    metadata={{'The Fellowship of the Ring': 'tfotr.jpg'}}\n                />\n            </RepositoryProvider>\n        </Box>\n    );\n};\n\nexport default App;\n","/data.json":'{\n  "name": "The Fellowship of the Ring",\n  "author": {\n    "firstName": "Obi-Wan",\n    "lastName": "Kenobi"\n  }\n}\n',"/repo.tsx":"import React from 'react';\nimport {\n    AutoViewProps,\n    ComponentsRepo,\n    AutoFields,\n    RefComponent\n} from '@autoviews/core';\nimport {Card, CardMedia, Box, Typography} from '@mui/material';\n\nconst staticPath = '/img/examples/ref/';\nconst host = 'localhost:3000'; // TODO: make it env variable, or calculated\n\nconst StringTitleComponent: React.FC<AutoViewProps> = ({data}) => (\n    <Typography variant=\"body1\">{data}</Typography>\n);\n\nconst StringComponent: React.FC<AutoViewProps> = ({data}) => (\n    <span>{data}</span>\n);\n\nexport const repo = new ComponentsRepo('ref-example-repo', node => {\n    if ('$ref' in node) {\n        return '$ref';\n    }\n\n    if ('type' in node) {\n        return node.type;\n    }\n\n    throw new Error('cannot resolve type');\n});\n\nrepo.register('string', {\n    name: 'title',\n    component: StringTitleComponent\n});\n\nrepo.register('string', {\n    name: 'basic',\n    component: StringComponent\n});\n\nrepo.register('object', {\n    name: 'regularObject',\n    component: props => (\n        <dl style={{margin: 0}}>\n            <Typography variant=\"body2\">\n                <AutoFields {...props} />\n            </Typography>\n        </dl>\n    )\n});\n\nrepo.register('object', {\n    name: 'root',\n    component: props => (\n        <Card sx={{display: 'flex'}}>\n            <Box sx={{padding: '20px'}}>\n                <CardMedia\n                    component=\"img\"\n                    height=\"140\"\n                    image={\n                        'http://' +\n                        host +\n                        staticPath +\n                        props.metadata[props.data.name]\n                    }\n                    alt={props.data}\n                />\n            </Box>\n            <Box\n                sx={{display: 'flex', flexDirection: 'column', padding: '10px'}}\n            >\n                <AutoFields {...props} />\n            </Box>\n        </Card>\n    ),\n    predicate: node => node.$id && node.$id === 'BookSchemaId'\n});\n\nrepo.register('$ref', {\n    name: 'oneOfAsEnum',\n    component: RefComponent\n});\n\nrepo.addWrapper(\n    (item, props) => (\n        <>\n            <dt>{props.field + ': '}</dt>\n            <dd>{item}</dd>\n        </>\n    ),\n    {include: ['basic']}\n);\n","/BookSchema.json":'{\n  "$id": "BookSchemaId",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    },\n    "author": {\n      "$ref": "UserSchemaId"\n    }\n  }\n}\n',"/UserSchema.json":'{\n  "$id": "UserSchemaId",\n  "type": "object",\n  "properties": {\n    "firstName": {\n      "type": "string"\n    },\n    "lastName": {\n      "type": "string"\n    }\n  }\n}\n'},m={"fast-json-patch":"^3.1.0","@mui/material":"^5.3.1","@emotion/react":"^11.7.1","@emotion/styled":"^11.6.0"},c={activePath:"/App.tsx"},d=["components"],l={},h="$ref",u={unversionedId:"subschemas/combiners-ref",id:"subschemas/combiners-ref",title:"$ref",description:"With $ref keyword schema can reference another schema or itself.",source:"@site/docs/subschemas/combiners-ref.md",sourceDirName:"subschemas",slug:"/subschemas/combiners-ref",permalink:"/autoviews/docs/subschemas/combiners-ref",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/packages/website/docs/subschemas/combiners-ref.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"oneOf",permalink:"/autoviews/docs/subschemas/combiners-oneof"}},f={},g=[{value:"Full example",id:"full-example",level:2},{value:"example with jsonSchemaResolver?",id:"example-with-jsonschemaresolver",level:2}],v={toc:g};function k(e){var n=e.components,t=(0,a.Z)(e,d);return(0,s.kt)("wrapper",(0,r.Z)({},v,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"ref"},"$ref"),(0,s.kt)("p",null,"With ",(0,s.kt)("inlineCode",{parentName:"p"},"$ref")," keyword schema can reference another schema or itself.\nTo make this work, all referred schemas must be in context by passing them to ",(0,s.kt)("inlineCode",{parentName:"p"},"<RepositoryProvider />"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<RepositoryProvider\n  components={repo}\n  schemas={[jsonSchema1, jsonSchema2]}\n>\n  // ...\n</RepositoryProvider>\n")),(0,s.kt)("p",null,"Next, repository should have component, which resolves ",(0,s.kt)("inlineCode",{parentName:"p"},"$ref"),". Ready-to-go component is available within ",(0,s.kt)("inlineCode",{parentName:"p"},"@autoviews/core")," package."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"import {RefComponent} from '@autoviews/core';\n\nrepo.register('$ref', RefComponent);\n")),(0,s.kt)("p",null,"To make AutoViews automatically render this component when facing ",(0,s.kt)("inlineCode",{parentName:"p"},"$ref")," keyword, repo's ",(0,s.kt)("inlineCode",{parentName:"p"},"getNodeType")," should return keyword as type:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"new ComponentsRepo('example-repo', node => {\n  if ('$ref' in node) {\n    return '$ref';\n  }\n\n  return node.type;\n});\n")),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"Order of resolving types in ",(0,s.kt)("inlineCode",{parentName:"p"},"getNodeType")," does matter. By placing ",(0,s.kt)("inlineCode",{parentName:"p"},"$ref")," condition before returning ",(0,s.kt)("inlineCode",{parentName:"p"},"node.type")," all references will be resolved at the beginning of processing each node."))),(0,s.kt)("h2",{id:"full-example"},"Full example"),(0,s.kt)(i.B,(0,r.Z)({},o,{mdxType:"Demo"})),(0,s.kt)("h2",{id:"example-with-jsonschemaresolver"},"example with jsonSchemaResolver?"))}k.isMDXComponent=!0}}]);
//# sourceMappingURL=c3cd0188.b47448d4.js.map
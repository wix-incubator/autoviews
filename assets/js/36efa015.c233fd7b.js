"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[522],{1776:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>a,contentTitle:()=>p,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>m});var n=t(7462),i=(t(7294),t(3905));const s={},p="Repository Components",r={unversionedId:"entities/repository-components",id:"entities/repository-components",title:"Repository Components",description:"AutoViews provides two React components for independent render of any component registered within repo.",source:"@site/docs/entities/repository-components.md",sourceDirName:"entities",slug:"/entities/repository-components",permalink:"/autoviews/docs/entities/repository-components",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/website/docs/entities/repository-components.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"Events",permalink:"/autoviews/docs/entities/events"},next:{title:"Subschemas",permalink:"/autoviews/docs/subschemas/"}},a={},m=[{value:"<code>&lt;RepositoryComponentByType /&gt;</code>",id:"repositorycomponentbytype-",level:2},{value:"API",id:"api",level:3},{value:"Example",id:"example",level:3},{value:"<code>&lt;RepositoryComponentByRecordName /&gt;</code>",id:"repositorycomponentbyrecordname-",level:2},{value:"API",id:"api-1",level:3},{value:"Example",id:"example-1",level:3}],c={toc:m};function d(e){let{components:o,...t}=e;return(0,i.kt)("wrapper",(0,n.Z)({},c,t,{components:o,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"repository-components"},"Repository Components"),(0,i.kt)("p",null,"AutoViews provides two React components for independent render of any component registered within repo.\nThese components are useful in case of rendering some specific logic which couldn't be described in schema."),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Both components use Repository context. Make sure they are rendered inside ",(0,i.kt)("inlineCode",{parentName:"p"},"<RepositoryProvider />")," scope.")),(0,i.kt)("h2",{id:"repositorycomponentbytype-"},(0,i.kt)("inlineCode",{parentName:"h2"},"<RepositoryComponentByType />")),(0,i.kt)("p",null,"Renders component, registered by given type."),(0,i.kt)("p",null,"When multiple components registered with the same type, the last registered is chosen."),(0,i.kt)("h3",{id:"api"},"API"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"interface RepositoryComponentByTypeProps {\n  type: string | symbol;\n}\ntype RepositoryComponentByType = React.FC<\n  RepositoryComponentByTypeProps & AutoViewProps\n>;\n")),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import {RepositoryComponentByType} from '@autoviews/core';\n\n<RepositoryComponentByType\n  type=\"string\"\n  schema={schema}\n  data={data}\n/>;\n")),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Using symbols can help avoid collisions with real types, described in schema.")),(0,i.kt)("h2",{id:"repositorycomponentbyrecordname-"},(0,i.kt)("inlineCode",{parentName:"h2"},"<RepositoryComponentByRecordName />")),(0,i.kt)("p",null,"Renders component, registered by given record name."),(0,i.kt)("h3",{id:"api-1"},"API"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"interface RepositoryComponentByRecordNameProps {\n  recordName: string;\n}\ntype RepositoryComponentByRecordName = React.FC<\n  RepositoryComponentByRecordNameProps & AutoViewProps\n>;\n")),(0,i.kt)("h3",{id:"example-1"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import {RepositoryComponentByType} from '@autoviews/core';\n\n<RepositoryComponentByRecordName\n  recordName=\"myComponent\"\n  schema={schema}\n  data={data}\n/>;\n")))}d.isMDXComponent=!0}}]);
//# sourceMappingURL=36efa015.c233fd7b.js.map
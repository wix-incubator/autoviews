"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[971],{1269:(t,M,e)=>{e.r(M),e.d(M,{assets:()=>c,contentTitle:()=>N,default:()=>r,frontMatter:()=>i,metadata:()=>n,toc:()=>o});var a=e(7462),u=(e(7294),e(3905));const i={},N="Quick Start",n={unversionedId:"index",id:"index",title:"Quick Start",description:"logo",source:"@site/docs/index.md",sourceDirName:".",slug:"/",permalink:"/autoviews/docs/",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/website/docs/index.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",next:{title:"The AutoView Component",permalink:"/autoviews/docs/basic/autoview"}},c={},o=[{value:"Installation",id:"installation",level:2},{value:"Basic Usage",id:"basic-usage",level:2},{value:"Basic Usage with data updates",id:"basic-usage-with-data-updates",level:2},{value:"Quick start example",id:"quick-start-example",level:2}],s={toc:o};function r(t){let{components:M,...i}=t;return(0,u.kt)("wrapper",(0,a.Z)({},s,i,{components:M,mdxType:"MDXLayout"}),(0,u.kt)("h1",{id:"quick-start"},"Quick Start"),(0,u.kt)("p",null,(0,u.kt)("img",{alt:"logo",src:e(8224).Z,width:"101",height:"57"})),(0,u.kt)("h2",{id:"installation"},"Installation"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-sh"},"yarn add @autoviews/core fast-json-patch\n")),(0,u.kt)("h2",{id:"basic-usage"},"Basic Usage"),(0,u.kt)("p",null,"The basic usage of the AutoViews utility to ",(0,u.kt)("strong",{parentName:"p"},"show")," data:"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-tsx"},"import {useCallback, useState} from 'react';\nimport {RepositoryProvider, AutoView} from '@autoviews/core';\n\nimport data from './data';\nimport schema from './schema.json';\nimport repo from './repo';\nimport uiSchema from './uiSchema';\n\nexport default function App() {\n  return (\n    <RepositoryProvider components={repo}>\n      <AutoView\n        schema={schema}\n        data={data}\n        uiSchema={uiSchema}\n        onClick={clickHandler}\n      />\n    </RepositoryProvider>\n  );\n}\n")),(0,u.kt)("h2",{id:"basic-usage-with-data-updates"},"Basic Usage with data updates"),(0,u.kt)("p",null,"The basic usage of the AutoViews utility to ",(0,u.kt)("strong",{parentName:"p"},"show")," and ",(0,u.kt)("strong",{parentName:"p"},"update")," data:"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-tsx"},"import {useCallback, useState} from 'react';\nimport {\n  RepositoryProvider,\n  AutoView,\n  AutoEventHandler,\n  AutoEvent\n} from '@autoviews/core';\nimport {applyPatch} from 'fast-json-patch';\n\nimport data from './data';\nimport schema from './schema.json';\nimport repo from './repo';\nimport uiSchema from './uiSchema';\n\nexport default function App() {\n  const [currentData, setData] = useState(data);\n\n  const clickHandler = useCallback(\n    (_: any, {patch}) => {\n      setData({...applyPatch(item, patch).newDocument});\n    },\n    [currentData, setData]\n  );\n\n  return (\n    <RepositoryProvider components={repo}>\n      <AutoView\n        schema={schema}\n        data={currentData}\n        uiSchema={uiSchema}\n        onClick={clickHandler}\n      />\n    </RepositoryProvider>\n  );\n}\n")),(0,u.kt)("h2",{id:"quick-start-example"},"Quick start example"),(0,u.kt)("p",null,(0,u.kt)("a",{parentName:"p",href:"/docs/examples/basic"},"Full Example - Quick Start")))}r.isMDXComponent=!0},8224:(t,M,e)=>{e.d(M,{Z:()=>a});const a="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxIiBoZWlnaHQ9IjU3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDEgNTciIGZpbGw9InZhcigtLWlmbS1jb2xvci1lbXBoYXNpcy02MDApIj48cGF0aCBkPSJNNzIuOTIyIDBsLjAwMS4wM2MuMjM4IDAgLjQ0NS4wMDcuNTg2LjAyOC4xNjQuMDIuNzg2LjA5MiAxLjM3OC4xNTMgMy4zMDcuMzM3IDcuMjA2IDEuNTMxIDEwLjEwNSAzLjA3MiA1LjQwOSAyLjg5OSA5LjY1NSA3LjMyOCAxMi4yOTggMTIuODcgNC43MTYgOS44NiAzLjQgMjEuNDAzLTMuNDA5IDI5Ljk3Ny0uOTM5IDEuMTg0LTMuMDIgMy4yODYtNC4xOTQgNC4yMjUtMy4yMTUgMi41NjItNy4wNzMgNC41MDEtMTAuOTIxIDUuNDctMi41NTIuNjMzLTQuMzE4Ljg0OC02Ljk5Mi44NDgtMi44MTcgMC00Ljg3OC0uMjY2LTcuNTMyLTEtNC44ODktMS4zMzctMTAuMzUtNC42MzQtMTMuMzMtOC4wNDNsLS43NTUtLjg2OC0xLjc0NSAxLjYzM2MtMS44NDcgMS43MzUtMy40NyAzLjAyMS01LjA2MiA0LjAxMi0zLjY1NCAyLjI2NS04LjExNCAzLjgxNy0xMS44NyA0LjEyMy0xLjY1NC4xNDMtNC43NjcuMTQzLTYuMjk4LjAxLTMuMDcyLS4yNzUtNi40NS0xLjI5Ni05LjY0NS0yLjkwOS03LjAwMS0zLjUzMS0xMi4xNTUtOS43NjctMTQuMzgtMTcuMzVDLjI3OSAzMy4yOS4wMTMgMzEuMDY0LjEwNSAyNy43MDZjLjEwMi0zLjQ4LjQ3LTUuNjQ0IDEuNDA5LTguMzkgMS40NS00LjIzNSAzLjY5NC03Ljg0OCA2LjgxOC0xMC45NTEgMi40MTktMi40MDkgNC42OTUtNC4wMjEgNy43ODctNS41MTFDMTkuNDI2IDEuMjczIDIyLjgwNC4zOTUgMjYuODA1LjA5OWMuMzktLjAzLjc4NS0uMDUgMS4xMTgtLjA1OEwyNy45MjIgMGg0NXptLTEuNzUgNi45NGgtNDIuMzRjLS40NTIuMDcyLTEuMTYxLjE1Ny0yLjQ3Ni4zMDMtNS4yNzcuNTkyLTkuNDIgMi41OTMtMTMuMDg0IDYuMzM4LTEuOTEgMS45NS0yLjk4IDMuNDMtNC4wMjIgNS41NTMtLjY5NCAxLjQxOC0xLjU1MSAzLjkzLTEuNzc2IDUuMjI1LS40MzkgMi41MTEtLjQxOCA2LjA0My4wNjIgOC4zNS42NDMgMy4xNDMgMi4zMDYgNi41ODIgNC4zOTggOS4wODMgMy42NTQgNC4zNzggOC41NTMgNy4wNjMgMTQuMTA2IDcuNzE2IDEuNDcuMTczIDQuODI3LjA2MSA2LjExMy0uMjA0IDQuMTU0LS44NDcgNy4yOTgtMi4zOTkgMTAuNDMxLTUuMTAzLjk2LS44MzcgMS43ODYtMS43OTcgMy4xNzQtMy43MDUgMi4wMTEtMi43NjYgMi40Ny0zLjEzNCA0LjA0Mi0zLjIyNiAxLjY3NC0uMTAyIDIuNjU0LjQ3IDMuODY4IDIuMjQ2IDEuNTIxIDIuMjM1IDMuMTQ0IDQuMDgyIDQuNzU2IDUuNDEgMy4yOTcgMi42OTQgNy43MTYgNC40MTkgMTEuOTQyIDQuNjUzIDIuNTMxLjE0MyA0LjM3OC0uMDQgNi43MzYtLjY1MyA3LjQ2MS0xLjkyOSAxMy4zNy03Ljg2OSAxNS4yOS0xNS4zOTEuNDU5LTEuODI3LjYwMS0zLjMxNy41My01Ljg2OS0uMDYxLTIuMzI3LS4xOTQtMy4zMDctLjczNS01LjExMy0xLjAxLTMuNDItMi42NDMtNi4yMTYtNS4xMjMtOC43ODgtMy4xMTMtMy4yMTUtNi40NzEtNS4xNDQtMTAuNTQ0LTYuMDQyLS42NDMtLjE0My0yLjE2My0uMzc4LTMuMzY4LS41MmE2NS4xOTIgNjUuMTkyIDAgMDEtMS45OC0uMjYzek0yOC4zNSAyMS4zMzFhNy4wNDIgNy4wNDIgMCAxMTAgMTQuMDg1IDcuMDQyIDcuMDQyIDAgMDEwLTE0LjA4NXptNDMuNDc5IDBhNy4wNDIgNy4wNDIgMCAxMTAgMTQuMDg1IDcuMDQyIDcuMDQyIDAgMDEwLTE0LjA4NXoiLz48L3N2Zz4K"}}]);
//# sourceMappingURL=c377a04b.fecfb6ad.js.map
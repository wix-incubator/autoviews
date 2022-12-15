"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[173],{9079:(e,t,n)=>{n.r(t),n.d(t,{REQUIRED:()=>m,assets:()=>d,contentTitle:()=>o,default:()=>k,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const i={},o="The AutoView Component",l={unversionedId:"basic/autoview",id:"basic/autoview",title:"The AutoView Component",description:"The AutoView React component is the main component of the AutoViews library.",source:"@site/docs/basic/autoview.md",sourceDirName:"basic",slug:"/basic/autoview",permalink:"/autoviews/docs/basic/autoview",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/website/docs/basic/autoview.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"Quick Start",permalink:"/autoviews/docs/"},next:{title:"The Components Repository",permalink:"/autoviews/docs/entities/components-repo"}},d={},p=[{value:"Basic example of AutoView usage",id:"basic-example-of-autoview-usage",level:2},{value:"Properties of the <code>AutoView</code> Component",id:"properties-of-the-autoview-component",level:2}],m=()=>(0,r.kt)("span",{style:{backgroundColor:"#00a4db",color:"white",borderRadius:"10px",padding:"0 10px"}},"Required"),s={toc:p,REQUIRED:m};function k(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"the-autoview-component"},"The AutoView Component"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"AutoView")," React component is the main component of the AutoViews library.\n",(0,r.kt)("inlineCode",{parentName:"p"},"AutoView")," automatically render ",(0,r.kt)("inlineCode",{parentName:"p"},"data")," that conforms to the given ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONSchema")," using the React components\nregistered in ",(0,r.kt)("a",{parentName:"p",href:"/docs/entities/components-repo"},"The Components Repository")," (",(0,r.kt)("inlineCode",{parentName:"p"},"ComponentsRepo"),")\nand provided through ",(0,r.kt)("a",{parentName:"p",href:"/docs/entities/repository-provider"},"The Repository Provider")," (",(0,r.kt)("inlineCode",{parentName:"p"},"RepositoryProvider"),")."),(0,r.kt)("p",null,"Optionally, ",(0,r.kt)("inlineCode",{parentName:"p"},"AutoView")," can use the ",(0,r.kt)("a",{parentName:"p",href:"/docs/entities/ui-schema"},"UISchema")," (",(0,r.kt)("inlineCode",{parentName:"p"},"UISchema"),") to customize how to render the components - which components to use,\nat which order or using which groups."),(0,r.kt)("h2",{id:"basic-example-of-autoview-usage"},"Basic example of AutoView usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"<RepositoryProvider components={repo}>\n  <AutoView\n    schema={schema}\n    data={currentData}\n    uiSchema={uiSchema}\n    onClick={clickHandler}\n  />\n</RepositoryProvider>\n")),(0,r.kt)("h2",{id:"properties-of-the-autoview-component"},"Properties of the ",(0,r.kt)("inlineCode",{parentName:"h2"},"AutoView")," Component"),(0,r.kt)("p",null,"For reference, the properties of the ",(0,r.kt)("inlineCode",{parentName:"p"},"AutoView")," are defined as the interface ",(0,r.kt)("inlineCode",{parentName:"p"},"AutoViewProps"),"."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"schema")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"CoreSchemaMetaSchema")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)(m,{mdxType:"REQUIRED"})," The ",(0,r.kt)("inlineCode",{parentName:"td"},"JSONSchema")," representing the data that should be rendered. See also ",(0,r.kt)("a",{parentName:"td",href:"/docs/entities/the-json-schema"},"the Data JSONSchema"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"data")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"any")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("inlineCode",{parentName:"td"},"data")," property is the input to be rendered by ",(0,r.kt)("inlineCode",{parentName:"td"},"AutoViews"),". ",(0,r.kt)("inlineCode",{parentName:"td"},"data")," is optional, and if present should be valid against ",(0,r.kt)("inlineCode",{parentName:"td"},"JSONSchema"),". If not valid and if the ",(0,r.kt)("inlineCode",{parentName:"td"},"validation")," property is ",(0,r.kt)("inlineCode",{parentName:"td"},"true"),", the ",(0,r.kt)("inlineCode",{parentName:"td"},"onError")," callback will be called with a validation error.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"uiSchema")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"UISchema")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("a",{parentName:"td",href:"/docs/entities/ui-schema"},"UISchema")," used to modify how the data is rendered.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"validation")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"boolean")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false")),(0,r.kt)("td",{parentName:"tr",align:null},"Defined if to validate the ",(0,r.kt)("inlineCode",{parentName:"td"},"data")," against the ",(0,r.kt)("inlineCode",{parentName:"td"},"schema"),". If the validation fails, the ",(0,r.kt)("inlineCode",{parentName:"td"},"onError")," callback will be called with a validation error.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"pointer")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"''")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"pointer")," is a ",(0,r.kt)("a",{parentName:"td",href:"https://tools.ietf.org/html/rfc6901"},"JSONPointer")," ",(0,r.kt)("inlineCode",{parentName:"td"},"string")," that defines what ",(0,r.kt)("inlineCode",{parentName:"td"},"data")," part ",(0,r.kt)("inlineCode",{parentName:"td"},"AutoView")," should render. By default the ",(0,r.kt)("inlineCode",{parentName:"td"},"data")," root is rendered.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"schemaPointer")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"''")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"schemaPointer")," is a ",(0,r.kt)("a",{parentName:"td",href:"https://tools.ietf.org/html/rfc6901"},"JSONPointer")," ",(0,r.kt)("inlineCode",{parentName:"td"},"string")," that defines what ",(0,r.kt)("inlineCode",{parentName:"td"},"schema")," part ",(0,r.kt)("inlineCode",{parentName:"td"},"AutoView")," should use for data rendering. By default the 'schema' root is used for rendering.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"pick")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string[]")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"[]")),(0,r.kt)("td",{parentName:"tr",align:null},"Specifies an array of field names ",(0,r.kt)("strong",{parentName:"td"},"to render")," for ",(0,r.kt)("inlineCode",{parentName:"td"},"object")," types.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"omit")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string[]")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"[]")),(0,r.kt)("td",{parentName:"tr",align:null},"Specifies an array of field names ",(0,r.kt)("strong",{parentName:"td"},"to not render")," for ",(0,r.kt)("inlineCode",{parentName:"td"},"object")," types.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"onChange")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AutoEventHandler <AutoChangeEvent>")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"A data change event handler that components in the ",(0,r.kt)("inlineCode",{parentName:"td"},"ComponentsRepo")," can invoke with ",(0,r.kt)("inlineCode",{parentName:"td"},"JSONPatch")," over the ",(0,r.kt)("inlineCode",{parentName:"td"},"data"),". See also ",(0,r.kt)("a",{parentName:"td",href:"/docs/entities/events"},"Events"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"onClick")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AutoEventHandler <AutoClickEvent>")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"A click event handler that components in the ",(0,r.kt)("inlineCode",{parentName:"td"},"ComponentsRepo")," can invoke with any ",(0,r.kt)("inlineCode",{parentName:"td"},"data")," payload. See also ",(0,r.kt)("a",{parentName:"td",href:"/docs/entities/events"},"Events"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"onError")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"(error:ValidationError) => void")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Called when ",(0,r.kt)("inlineCode",{parentName:"td"},"validation")," is set and the ",(0,r.kt)("inlineCode",{parentName:"td"},"data")," does not conform to the ",(0,r.kt)("inlineCode",{parentName:"td"},"schema"),". See also ",(0,r.kt)("a",{parentName:"td",href:"/docs/entities/events"},"Events"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"onRenderError")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"(error:ValidationError) => void")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Called if any child component throws an error during rendering. See also ",(0,r.kt)("a",{parentName:"td",href:"/docs/entities/events"},"Events"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"onCustomEvent")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AutoEventHandler<AutoCustomEvent> ")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"A Custom event with payload of ",(0,r.kt)("inlineCode",{parentName:"td"},"data")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"name")," for custom usage by components and applications. See also ",(0,r.kt)("a",{parentName:"td",href:"/docs/entities/events"},"Events"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"metadata")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Metadata")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"A Map of JSONShema pointer to ",(0,r.kt)("inlineCode",{parentName:"td"},"any")," payload that is passed to components. The utility ",(0,r.kt)("inlineCode",{parentName:"td"},"getComponentMetadata")," can be used to extract the metadata by the schema pointer.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"repositoryName")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Passed to the components - The repository name is the component is registered with.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"field")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Passed to the components - the field to be rendered.")))))}k.isMDXComponent=!0}}]);
//# sourceMappingURL=c81e2c9d.c539b2f4.js.map
"use strict";(self.webpackChunk_autoviews_website=self.webpackChunk_autoviews_website||[]).push([[806],{6132:function(e,t,n){n.r(t),n.d(t,{assets:function(){return m},contentTitle:function(){return p},default:function(){return u},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return d}});var r=n(3117),a=n(102),o=(n(7294),n(3905)),i=["components"],l={},p="Creating Array components",s={unversionedId:"entities/array-components",id:"entities/array-components",title:"Creating Array components",description:"AutoViews does not come with pre-made components to render arrays (doing so will defeat the idea of",source:"@site/docs/entities/array-components.md",sourceDirName:"entities",slug:"/entities/array-components",permalink:"/autoviews/docs/entities/array-components",draft:!1,editUrl:"https://github.com/wix-incubator/autoviews/tree/master/packages/website/docs/entities/array-components.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"The Components Repository",permalink:"/autoviews/docs/entities/components-repo"},next:{title:"Creating Object components",permalink:"/autoviews/docs/entities/object-components"}},m={},d=[{value:"AutoItems",id:"autoitems",level:2},{value:"<code>AutoItems</code> props",id:"autoitems-props",level:3},{value:"the render function",id:"the-render-function",level:3},{value:"Example - rendering a plain list",id:"example---rendering-a-plain-list",level:3},{value:"Example - rendering an HTML list",id:"example---rendering-an-html-list",level:3},{value:"Example - rending an HTML table",id:"example---rending-an-html-table",level:3},{value:"Example - rending an HTML Table with headers",id:"example---rending-an-html-table-with-headers",level:3}],c={toc:d};function u(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"creating-array-components"},"Creating Array components"),(0,o.kt)("p",null,"AutoViews does not come with pre-made components to render arrays (doing so will defeat the idea of\nusing your own components). However, AutoViews provides utilities and APIs to create your own components\nto render arrays."),(0,o.kt)("p",null,"The simplest array component will be"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"new ComponentsRepo('ArrayRepo').register('array', {\n  name: 'tableComponent',\n  component: props => <AutoItems {...props} />\n});\n")),(0,o.kt)("h2",{id:"autoitems"},"AutoItems"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"AutoItems")," is a utility element used to render the elements of the array.\nInternally it apply ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoViews")," for each of the items of the array."),(0,o.kt)("p",null,"It can be used with array of objects, strings, numbers or other types, including mixed type arrays, delegating\nto ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoViews")," to render the actual item."),(0,o.kt)("h3",{id:"autoitems-props"},(0,o.kt)("inlineCode",{parentName:"h3"},"AutoItems")," props"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"extending ",(0,o.kt)("inlineCode",{parentName:"li"},"AutoViewProps")," - getting the same properties as ",(0,o.kt)("inlineCode",{parentName:"li"},"AutoViews")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"render")," - optional callback to apply to each of the rendered array elements")),(0,o.kt)("h3",{id:"the-render-function"},"the render function"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"declare function render(\n  item: React.ReactNode,\n  props: AutoViewProps,\n  index: number\n): React.ReactNode;\n")),(0,o.kt)("p",null,"The render callback parameters"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"item")," - the rendered item, rendered using ",(0,o.kt)("inlineCode",{parentName:"li"},"AutoViews"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"props")," - the ",(0,o.kt)("inlineCode",{parentName:"li"},"AutoViewProps")," used to render the item."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"index")," - the index of the item in the array")),(0,o.kt)("h3",{id:"example---rendering-a-plain-list"},"Example - rendering a plain list"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"new ComponentsRepo('ArrayRepo').register('array', {\n  name: 'tableComponent',\n  component: props => <AutoItems {...props} />\n});\n")),(0,o.kt)("h3",{id:"example---rendering-an-html-list"},"Example - rendering an HTML list"),(0,o.kt)("p",null,"This example renders an HTML list.\nThe example is using ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoItems.render")," to wrap the per item element (",(0,o.kt)("inlineCode",{parentName:"p"},"node")," below) with the list ",(0,o.kt)("inlineCode",{parentName:"p"},"<li>")," element."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"new ComponentsRepo('ArrayRepo').register('array', {\n  name: 'tableComponent',\n  component: props => (\n    <ul>\n      <AutoItems\n        {...props}\n        render={node => <li>node</li>}\n      ></AutoItems>\n    </ul>\n  )\n});\n")),(0,o.kt)("h3",{id:"example---rending-an-html-table"},"Example - rending an HTML table"),(0,o.kt)("p",null,"Assuming out data has the form ",(0,o.kt)("inlineCode",{parentName:"p"},"Array<object>"),",\nThis example renders the table using ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoItems")," which delegates to ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoViews")," to render\nthe ",(0,o.kt)("inlineCode",{parentName:"p"},"object"),". AutoViews will then use the ",(0,o.kt)("inlineCode",{parentName:"p"},"tablrRowComponent"),", which renders the ",(0,o.kt)("inlineCode",{parentName:"p"},"<tr>")," element\nand is using the ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoFields")," to render the members of the object.\nthe example is also using the ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoFields.render")," property to wrap the fields controls with ",(0,o.kt)("inlineCode",{parentName:"p"},"<td>")," elements."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"new ComponentsRepo('ArrayRepo')\n  .register('array', {\n    name: 'tableComponent',\n    component: props => (\n      <table>\n        <tbody>\n          <AutoItems {...props} />\n        </tbody>\n      </table>\n    )\n  })\n  .register('object', {\n    name: 'tableRowComponent',\n    component: props => (\n      <tr>\n        <AutoFields\n          {...props}\n          render={node => <td>node</td>}\n        />\n      </tr>\n    )\n  });\n")),(0,o.kt)("h3",{id:"example---rending-an-html-table-with-headers"},"Example - rending an HTML Table with headers"),(0,o.kt)("p",null,"To render a table with headers, we need to extend the example above with logic to extract\nthe field titles from the ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONSchema"),", filter and order the fields as specified in the ",(0,o.kt)("inlineCode",{parentName:"p"},"UISchema"),"."),(0,o.kt)("p",null,"This involves a bit of low level ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoViews")," apis -"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"extractItemUISchema")," - extracts the ",(0,o.kt)("inlineCode",{parentName:"li"},"UISchama")," for the items of an array"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"createUISchema")," - creates a default ",(0,o.kt)("inlineCode",{parentName:"li"},"UISchama")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"getHints")," - returns the ",(0,o.kt)("inlineCode",{parentName:"li"},"hints")," from the ",(0,o.kt)("inlineCode",{parentName:"li"},"UISchema")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"orderFields")," - orders the field names from the ",(0,o.kt)("inlineCode",{parentName:"li"},"JSONSchema.items")," using the ",(0,o.kt)("inlineCode",{parentName:"li"},"order")," hint")),(0,o.kt)("p",null,"once we have the ordered headers ",(0,o.kt)("inlineCode",{parentName:"p"},"string[]"),", we render the headers as ",(0,o.kt)("inlineCode",{parentName:"p"},"thead"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'import {\n    AutoViewProps,\n    AutoItems,\n    AutoFields,\n    orderFields,\n    getHints,\n    extractItemUISchema,\n    createUISchema\n} from "@autoviews/core";\n\nnew ComponentsRepo("ArrayRepo")\n    .register("array", {\n        name: "tableComponent",\n        component: (props) => {\n            const headers = orderFields(\n                Object.keys((props.schema.items as any).properties),\n                getHints(extractItemUISchema(props.uiSchema ?? createUISchema()), "").order\n            ).map(\n                (field) => (props.schema?.items as any).properties[field].title\n            ) as string[];\n\n            return (\n                <table>\n                    <thead>\n                        <tr>\n                            {headers.map((header, i) => (\n                                <td key={i}>{header}</td>\n                            ))}\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <AutoItems {...props}/>\n                    </tbody>\n                </table>\n            )\n        }\n    })\n    .register("object", {\n        name: "tableRowComponent",\n        component: props => (\n            <tr>\n                <AutoFields {...props} render={\n                    (node) => <td>node</td>\n                }/>\n            </tr>\n        )\n    })\n')))}u.isMDXComponent=!0},3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=s(n),u=a,h=c["".concat(p,".").concat(u)]||c[u]||d[u]||o;return n?r.createElement(h,i(i({ref:t},m),{},{components:n})):r.createElement(h,i({ref:t},m))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"}}]);
//# sourceMappingURL=d2fc6773.cf57f99c.js.map
# UIGroups

`UIGroups` is part of `UIHints` which are part of `UISchema`.

As any `UIHints` the `UIGroups` could be applied to a certain `JSONPointer`:

```TypeScript
const uiSchema = {
    hints: {
        '/path/to/data': {
            uiGroups: [ /*UIGroups*/ ]
        }
    },
```

Each item in an array of `UIGroups` have next interface:

```TypeScript
interface UIGroup {
    name: string;
    title?: string;
    fields: string[];
}
```

- `name` is required property and may be used to address it in `ComponentOptions`.
- `title` is optional, that could be the actual title string or `i18n` identifier.
- `fields` array of object keys that have to be grouped.

Like other `UIHints`, `UIGroups` need components that respect this type of hints.

Here is the complex example:

```TypeScript
const data = {
    title: 'Awesome Product',
    description: 'Awesome Product helps you to do an awesome things!',
    date: 1151567100000,

    company: 'Awesome Company',
    fullDescription: 'You could experience variety of awesome features with an awesome 42% discount!',
    image: '/path/to/image.png',

    gallery: [
        '/path/to/image.png',
        '/path/to/image.png',
        '/path/to/image.png'
    ],
    featuredImage: 2 // reference,
    category: 1 // reference
};

const uiSchema = {
    hints: {
        '/path/to/data': {
            uiGroups: [{
                name: 'info',
                title: 'Product info',
                fields: ['title', 'description', 'date']
            }, {
                name: 'details',
                title: 'Product details',
                fields: ['company', 'fullDescription', 'image']
            }, {
                name: 'additional_info',
                fields: ['featuredImage', OTHER_FIELDS],
            }]
        }
    },
    components: {
        editRepo: {
            '/path/to/data': {
                name: 'complexForm',
                options: {
                    layout: [
                        {
                            groups: [{
                                group: 'info'
                            },{
                                group: 'details'
                            }],
                            width: '2fr'
                        },
                        {
                            width: "20px"
                        },
                        {
                            groups: [{
                                group: 'OTHER_GROUPS'
                            }],
                            width: "1fr"
                        }
                    ]
                }
            }
        },
        viewRepo: {
            '/path/to/data': {
                name: 'complexView',
                options: {
                    layout: {
                        top: {
                            left: {
                                groups: [{
                                    group: 'info'
                                }],
                                width: '50%'
                            },
                            right: {
                                groups: [{
                                    group: 'details'
                                }],
                                width: '50%'
                            }
                        },
                        bottom: {
                            groups: [{group: 'OTHER_GROUPS'}]
                        }
                    }
                }
            }
        }
    }
}
```

---

## Key features:

- groups may have different layouts using specific component options
- same field may appear in different groups
- special constants `OTHER_PROPERTIES`, `OTHER_GROUPS` allows to select all non-selected properties and groups
- there is virtual `UNGROUPED` group, which contains all properties that is not defined in any group, there is special utility `getUngroupedProperties` to retirieve them

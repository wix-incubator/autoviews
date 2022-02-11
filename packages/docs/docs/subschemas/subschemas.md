# Subschemas

JSON Schemas includes such keywords as `if`/`then`/`else`, `oneOf`, `allOf`, `anyOf`, `$ref`.

These keywords serve to apply some parts of schemas, called subschemas, by resolving some logic or references to other schemas or part of schema.

Since AutoViews use JSON Schema to render UI, it's not determined how these keywords should affect rendering, rather library customers should define it by themselves. 

All the keywords could be register within [repository](../entities/components-repo.md) and rendered anywhere with [Repository Components](../entities/repository-components.md).

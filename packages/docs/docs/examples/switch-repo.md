# Switch ComponentsRepo

import {Demo} from '@site/src/components';
import * as demo from '@site/src/examples/switch-repo';

Here we extended our simple [onClick](./onclick) example with `Edit` button which opens item view as form.

We made `ListItem` component, which we are using in `list-repo.tsx` for each object in our users array.

It has internal state, that reflects how to display item: as list item or as form by providing new `ComponentsRepo` in case we want to render a form view.

`ListItem` in it's state collects a list of `JSONPatch` objects and by clicking on `Save` button we apply those patches in `clickHandler` at the `App.tsx`.

<Demo {...demo} />

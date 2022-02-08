# AutoViews

`AutoViews` is a set of utilities and abstractions which provides functionality to automatically render UI on top of `JSONSchema`.

To render UI automatically `AutoViews` uses some abstractions:

-   **AutoView** — React component, which gets `JSONSchema`, `data`, optional `UISchema` as properties and `ComponentsRepo` as `components` property in `context` and renders UI accordingly.
-   **ComponentsRepo** — class that keeps all components, grouped by data types (`string`, `object` and others, even custom data types) and optionally with theirs `predicate`'s, which are boolean functions that defines ability of this component to render current `JSONSchema` node.
-   **UISchema** — is object that describes specific rules to render that specific `JSONSchema` node:
    -   what component to use,
    -   what properties should be used with chosen component
    -   what `UIHints` has to be available for chosen component

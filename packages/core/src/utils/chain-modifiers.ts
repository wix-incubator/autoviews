export const chainModifiers =
    <Value, Modifier>(run: (mod: Modifier) => Value) =>
    (...thunks: Array<(val: Value) => Modifier>) =>
    (initial: Value) =>
        run(
            thunks.reduce((chained, next) => val => next(run(chained(val))))(
                initial
            )
        );

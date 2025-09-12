const rethrow = (e) => {
    throw e;
};

const createSyncPromise = (val) => {
    const self = {
        syncPromise: true,
        val,
        then: (onok = (x) => x, onerr = rethrow) => {
            let next;
            try {
                next = onok(val);
            } catch (e) {
                next = onerr(e);
            }
            return SyncPromise.resolve(next);
        },
        catch: () => {
            throw Error(`catch not supported by sync promises`);
        },
    };
    return self;
};

/**
   * @type {Pick<typeof Promise, 'resolve' | 'reject' | 'all'>}
   * A partial replacement implementation of `Promise` which _doesn't_ use the event loop. plv8 triggers
   * require return values synchronously, so this executes the `.then` callbacks immediately. It doesn't
   * support `.catch` because errors are thrown synchronously too.
   */
const SyncPromise = {
    /** @type {typeof Promise.resolve} */
    resolve: ((val) =>
        val && typeof val.then === 'function' ? val : createSyncPromise(val)),
    reject: rethrow,
    /** @type {typeof Promise.all} */
    all: (((promises) =>
        SyncPromise.resolve(
            promises.map(p => {
                let result = null;
                SyncPromise.resolve(p).then((value) => (result = {value}));
                return result.value;
            }),
        ))),
};

# gundb-direct-localforage-adapter #

a trivial storage adapter for GunDB using localForage

[localForage](https://github.com/localForage/localForage) is a common interface for various browser (and Node.js) storage mechanisms - it wraps IndexedDB, WebSQL or localStorage out-of-the-box and may easily be extended to support additional storage solutions (including remote ones)

[GunDB](https://github.com/amark/gun)'s built-in storage adapters based on [RAD](https://github.com/amark/gun/wiki/RAD) are completely broken (RAD [will soon be replaced by something else](https://github.com/amark/gun/issues/1329#issuecomment-1556079655)). Until then, this storage adapter may be used instead.

In contrast to the author's [in-memory storage](https://github.com/rozek/gundb-in-memory-storage-adapter) and [direct localStorage](https://github.com/rozek/gundb-direct-localstorage-adapter) adapter, this one can be used to persist large volumes of shared data (up to the quota defined by a client's browser).

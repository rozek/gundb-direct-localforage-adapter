# gundb-direct-localforage-adapter #

a trivial storage adapter for GunDB using localForage

[localForage](https://github.com/localForage/localForage) is a common interface for various browser (and Node.js) storage mechanisms - it wraps IndexedDB, WebSQL or localStorage out-of-the-box and may easily be extended to support additional storage solutions (including remote ones)

[GunDB](https://github.com/amark/gun)'s built-in storage adapters based on [RAD](https://github.com/amark/gun/wiki/RAD) are completely broken (RAD [will soon be replaced by something else](https://github.com/amark/gun/issues/1329#issuecomment-1556079655)). Until then, this storage adapter may be used instead.

In contrast to the author's [in-memory storage](https://github.com/rozek/gundb-in-memory-storage-adapter) and [direct localStorage](https://github.com/rozek/gundb-direct-localstorage-adapter) adapters, this one can be used to persist large volumes of shared data (up to the quota defined by a client's browser).

"direct" means that a nodes complete id (its "soul") is used as a key for localForage to store that node's contents. While this may work well for short souls, it will consume a lot of memory as soon as the node ids get longer...

> **Important**: this adapter is not yet finished and its documentation still has to be written. The plan is to finish everything by end of June, 2023

## Usage ##

Load localForage into your web page and copy the contents of file [directLocalForageAdapter.js](./src/directLocalForageAdapter.js) into a `<script>` element and add it to the `<head>` section of your HTML document right after the one for GunDB itself.

```
<script src="https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
<script>
  ... insert source code here
</script>
```

Then, instantiate a localForage instance as described in their [docs](https://localforage.github.io/localForage/) and create your GunDB instance with the following options (among others, if need be):

```
  const Store = localforage.createInstance({
    name:'GunDB-Test',            // name used for error messages
    driver:localforage.INDEXEDDB, // or any other driver(s)
    storeName:'GunDB-Test',       // name of actual database
  })

  const Gun = GUN({
    localStorage:false, directLocalForage:Store
  })
```

i.e., pass your localForage instance as the value of a GunDB option called `directLocalForage`

From now on, work with GunDB as usual - your nodes will be persisted in the configured database.

## License ##

[MIT License](LICENSE.md)

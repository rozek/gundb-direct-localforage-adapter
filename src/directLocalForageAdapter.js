/**** direct localForage adapter ****/

  GUN.on('create', function (Context) {        // do not use a "fat arrow" here!
    this.to.next(Context)

    let Storage = Context.opt.directLocalForage
    if ( Storage == null) { return }         // storage adapter wasn't requested

  /**** get - retrieve the contents of a given node ****/

    Context.on('get', function (WireMessage) {           // no "fat arrow" here!
      this.to.next(WireMessage)

      let DedupId = WireMessage['#']
      let LEX     = WireMessage.get
      let Soul    = (LEX == null ? undefined : LEX['#'])
      if (Soul == null) { return }

      Storage.getItem(Soul)                         // fetches data from storage
      .then((Data) => {
        if (Data == null) {                        // acknowledge a missing node
          Context.on('in', { '@':DedupId, err:null, put:null })
        } else {
          let Key = LEX['.']
          if ((Key != null) && ! Object.plain(Key)) {
            Data = GUN.state.ify(
              {}, Key, GUN.state.is(Data,Key), Data[Key], Soul
            )
          }

        /**** send data back to GunDB ****/

          Context.on('in', { '@':DedupId, ok:1, err:undefined, put:Data })
        }
      })
      .catch((Signal) => {                                // acknowledge failure
        Error = 'localForage get failure: ' + Signal + (
          Signal.stack == null ? '' : '' + Signal.stack
        )

        Context.on('in', { '@':DedupId, err:Signal, put:null })
      })
    })

  /**** put - patches the contents of a given node ****/

    Context.on('put', function (WireMessage) {           // no "fat arrow" here!
      this.to.next(WireMessage)

      let DedupId = WireMessage['#']
      let LEX     = WireMessage.put
      let Soul    = LEX['#'], Key  = LEX['.']

      Storage.getItem(Soul)             // fetches current contents from storage
      .then((Data) => {
        if (Data == null) { Data = '{}' }

        return Storage.setItem(Soul, JSON.stringify( // merges data into storage
          GUN.state.ify(
            JSON.parse(Data), Key, LEX['>'], LEX[':'], Soul
          )
        ))
      })
      .then((Data) => {                                   // acknowledge success
        Context.on('in', { '@':DedupId, ok:true, err:null })
      })
      .catch((Signal) => {                                // acknowledge failure
        Error = 'localForage put failure: ' + Signal + (
          Signal.stack == null ? '' : '' + Signal.stack
        )

        Context.on('in', { '@':DedupId, ok:false, err:Error })
      })
    })
  })


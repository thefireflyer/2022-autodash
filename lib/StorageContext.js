import { createContext } from 'react';

const NO_VALUE = Math.random()
export const SetupStorage = (
    isCloudAccount,
    storage,
    setIsLoading,
    setUser,
    newAlert) => {//TODO: add cloud syncing

    storage.current = {
        db: null,
        server: null,
        onMessageRecieved: [],
        keyValuePair:
            /**
             * @param {String} database an existing database to edit.
             * @param {String} key key of an existing or new key value pair.
             * @param {any} [updatedValue=NO_VALUE] new data value (optional), defaults to no update. Value of null will delete the key value pair.
             * @returns {(Promise)} if there was an error, {@link keyValuePair} will return the error code.
             *  If successful it will return the original data.
             */
                (database, key, updatedValue = NO_VALUE) =>
                new Promise((resolve, reject) => {

                    const transaction = storage.current.db.transaction(database, "readwrite");

                    const objectStore = transaction.objectStore(database);

                    const request = objectStore.get(key);

                    request.onsuccess = event => {
                        const data = event.target.result;
                        if (updatedValue !== NO_VALUE) {//should update existing data
                            if (updatedValue == null) {//data is null, delete the key value pair
                                objectStore.delete(key)
                            }
                            else {//new data, update it
                                objectStore.put({
                                    info: key,
                                    data: updatedValue
                                })
                            }
                        }

                        resolve(data)
                    };
                }),

        createDatabase:
            /**
             *
             * @param {String} databaseName
             * @param {String} primaryKey
             * @returns {IDBDatabase}
             */
                (databaseName, primaryKey) => new Promise((resolve, reject) => {
                resolve(storage.current.db.createObjectStore(databaseName, { keyPath: primaryKey }));
            }),

        removeDatabase:
            /**
             *
             * @param {String} databaseName
             * @returns {IDBDatabase}
             */
                (databaseName) => new Promise((resolve, reject) => {
                resolve(storage.current.db.deleteObjectStore(databaseName));
            }),

        getAll:
            /**
             *
             * @param {String} database
             * @returns
             */
                (database) => new Promise((resolve, reject) => {
                const transaction = storage.current.db.transaction(database, "readwrite");

                const objectStore = transaction.objectStore(database)
                let all = objectStore.getAll()
                all.onsuccess = event => {
                    const data = event.target.result;
                    // console.log(data)
                    resolve(data)
                }
            }),

        connectExternal:
            /**
             *
             * @returns {Boolean}
             */
                () => new Promise(async (resolve, reject) => {
                setUser({loading: true})
                let uri
                let auth
                let data = {}
                // newAlert({
                //   type: "info",
                //   title: "Connecting to external server",
                //   text: "Please wait..."
                // })
                await storage.current.keyValuePair("serverdata", "uri").then(res => {
                    uri = res?.data
                    console.log("loaded uri")
                })
                await storage.current.keyValuePair("serverdata", "serverauth").then(res => {
                    auth = res?.data
                    console.log("loaded serverauth")
                })
                await storage.current.getAll("userdata").then(res => {
                    res.forEach(element => {
                        console.log(element)
                        data[element.info] = element.data
                    });

                    console.log("data: ", data)
                })


                var operatingSystems = [
                    { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
                    { name: 'Windows', value: 'Win', version: 'NT' },
                    { name: 'iPhone', value: 'iPhone', version: 'OS' },
                    { name: 'iPad', value: 'iPad', version: 'OS' },
                    { name: 'Kindle', value: 'Silk', version: 'Silk' },
                    { name: 'Android', value: 'Android', version: 'Android' },
                    { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
                    { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
                    { name: 'Macintosh', value: 'Mac', version: 'OS X' },
                    { name: 'Linux', value: 'Linux', version: 'rv' },
                    { name: 'Palm', value: 'Palm', version: 'PalmOS' }
                ]

                let deviceOS = "Unknown"
                await operatingSystems.forEach(os => {
                    if (navigator.userAgent.includes(os.value)) {
                        console.log(os.name)
                        deviceOS = os.name
                    }
                })

                storage.current.server = await new WebSocket(`ws://` + uri + `/live/?os=` + deviceOS);
                console.log(storage.current.server)
                storage.current.server.onmessage = evt => {
                    console.log("Event data >>> " + evt.data)
                    storage.current.onMessageRecieved.forEach( reciever => {
                        reciever(evt.data)
                    })
                }

                storage.current.server.onclose = () => {
                    reject(false)
                    setUser({loading: false})
                    storage.current.server = null
                    storage.current.onMessageRecieved.forEach( reciever => {
                        reciever("[connection closed]")
                    })
                }

                storage.current.server.onerror = evt => {
                    console.error(evt)
                    reject(false)
                    setUser({loading: false})
                    storage.current.server = null
                    storage.current.onMessageRecieved.forEach( reciever => {
                        reciever("[connection failed]")
                    })
                }

                storage.current.server.onopen = () => {
                    console.log("test")
                    storage.current.server.send(auth)
                    storage.current.getAll("userdata").then(res => {
                        let clientInfo = {}

                        res.forEach(element => {
                            console.log(element)
                            clientInfo[element.info] = element.data
                        });

                        clientInfo["test"] = "test"
                        storage.current.server.send(JSON.stringify(clientInfo))
                        storage.current.keyValuePair("serverdata", "useserver", true).then(res => {
                            console.log("connection successful")
                            setUser({loading: false})
                            resolve(res)
                        })

                    })

                }

                // fetch(`http://`+uri + "/admin/", {
                //   method: `POST`,
                //   body: JSON.stringify(data),
                //   headers: {
                //     "Content-Type": "application/json",
                //     "Authorization": `Basic ${window.btoa(auth)}`
                //   }
                // }).then(res => {
                //   console.log("Request successful!")
                //   console.log(res)
                //   res.json().then(json => {
                //     console.log(json)

                //     storage.current.keyValuePair("serverdata", "useserver", true).then(res => {
                //       console.log(res)
                //     })

                //     newAlert({
                //       type: "success",
                //       title: "Connected to database",
                //       text: ""
                //     })
                //     resolve(true)

                //   })
                // }).catch(err => {
                //   newAlert({
                //     type: "error",
                //     title: "Error connecting to external server",
                //     text: `Request failed with status ${err}`
                //   })
                //   reject(`Request failed with status ${err}`)
                // })
            })

    }

    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB.");
    }

    if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().then((persistent) => {
            if (persistent) {
                console.log("Storage will not be cleared except by explicit user action");
            } else {
                console.log("Storage may be cleared by the UA under storage pressure.");
            }
        });
    }

    let request = window.indexedDB.open("testing05", 1);
    request.onerror = event => {
        newAlert({
            type: "error",
            title: "Trouble opening database",
            text: event.target.errorCode
        })
    };
    request.onsuccess = event => {
        storage.current.db = event.target.result;

        storage.current.db.onerror = event => {
            newAlert({
                type: "error",
                title: "Database error",
                text: event.target.errorCode
            })
        }

        storage.current.keyValuePair(
            "userdata", "username").then(res => {
            console.log("---" + JSON.stringify(res)) //TODO: remove!!
            setIsLoading(false)
            setUser({loading:false})

            setInterval(() => {
                if (storage.current.server == null)
                {
                    storage.current.keyValuePair(
                        "serverdata", "useserver").then(res => {
                        if (res?.data) {
                            if (window["WebSocket"]) {
                                console.log("attempting to connect to server...")
                                storage.current.connectExternal()
                            } else {
                                newAlert({
                                    type: "error",
                                    title: "Connection failure",
                                    text: `Your browser does not support WebSockets`
                                });
                            }
                        }
                        storage.current.server = 'not connected'
                    })
                }
            }, 3000);

        })


    };

    request.onupgradeneeded = event => {


        storage.current.db = event.target.result;
        storage.current.createDatabase("userdata", "info");
        storage.current.createDatabase("serverdata", "info");

        newAlert({
            type: "info",
            title: "Update",
            text: "update complete"
        })
    }

}
export const StorageContext = createContext();

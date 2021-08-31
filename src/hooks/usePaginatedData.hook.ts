import {
    bookPostConverter,
    DocumentData, DocumentSnapshot,
    FBFirestore,
    OrderByDirection,
    QueryDocumentSnapshot,
    SnapshotOptions
} from '../firebase/firebase.config';
import {useEffect, useState} from 'react';
import {FBCollections} from '../firebase/collections';

type PaginatedDataHookOptions = {
    direction: OrderByDirection
    firstBatch: number
    moreDataBatch: number
}
export const usePaginatedData = <T>(collection: string, orderBy: keyof T,options: PaginatedDataHookOptions) => {

    const {firstBatch, moreDataBatch, direction} = options

    // Data
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMoreItems, setLoadingMoreItems] = useState(false)
    const [lastDocRef, setLastDocRef] = useState<any>()

    useEffect(() => {
        setLastDocRef(null)
        fetchFirstBatch()
    },[direction, orderBy])

    // Main function
    // It fetches just the first batch of data
    const fetchFirstBatch = () => {
        setLoading(true)
        FBFirestore.collection(collection)
            .withConverter(genericConverter<T>())
            .orderBy(orderBy.toString(), direction)
            .limit(firstBatch)
            .get()
            .then(querySnapshot => {
                console.log("Fetched data: ", querySnapshot.docs.map(snap => snap.id))

                // Storing data
                setLoading(false)
                const docs = querySnapshot.docs.map(doc => doc.data());
                setData(docs)

                // Storing Ref to last object
                if(docs.length == 0){
                    setLastDocRef(null)
                } else {
                    const ref = docs[docs.length - 1] as any
                    setLastDocRef(ref[orderBy])
                }
            })
            .catch(e => {
                console.log("Error fetch paginated data: ", e)
            })
    }

    // Function called by the view
    // When it needs more data
    // It returns the second batch options
    const getMoreData = () => {
        if (!lastDocRef) {
            return
        }
        setLoadingMoreItems(true)
        FBFirestore.collection(FBCollections.bookPost)
            .withConverter(genericConverter<T>())
            .orderBy(orderBy.toString(), direction)
            .startAfter(lastDocRef)
            .limit(moreDataBatch)
            .get()
            .then(querySnapshot => {
                console.log("Fetched more data: ", querySnapshot.docs.map(snap => snap.id))

                setLoadingMoreItems(false)
                // Storing data
                const docs = querySnapshot.docs.map(doc => doc.data());
                setData([...data, ...docs])


                if (docs.length == 0) {
                    setLastDocRef(null)
                } else {
                    const ref = docs[docs.length - 1] as any
                    setLastDocRef(ref[orderBy])
                }
            })
            .catch(e => {
                throw Error(e)
            })
    }

    return {
        data,
        getMoreData,
        fetchFirstBatch,
        loading,
        loadingMoreItems
    }
}

const genericConverter = <T>() => ({
    toFirestore(modelObject: T): DocumentData {
        return modelObject
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
        const data =  snapshot.data()
        data.uid = snapshot.id
        return data as T
    }
})

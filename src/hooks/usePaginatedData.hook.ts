import fb,{
    bookPostConverter,
    DocumentData, DocumentSnapshot,
    FBFirestore, FieldPath,
    OrderByDirection, Query,
    QueryDocumentSnapshot,
    SnapshotOptions, WhereFilterOp,
} from '../firebase/firebase.config';
import {useEffect, useState} from 'react';
import {FBCollections} from '../firebase/collections';
import firebase from 'firebase';

type customFetchOptions<T> = {
    collection: string
    withConvertedDefault: typeof genericConverter
    orderByDefault:string
    direction: OrderByDirection
    firstBatch: number
    fetchThen: (querySnapshot: fb.firestore.QuerySnapshot<T> ) => void
}

type PaginatedDataHookOptions<T> = {
    direction: OrderByDirection
    firstBatch: number
    moreDataBatch: number,
    customFetch?:  (options:customFetchOptions<T>) =>void
}

export const usePaginatedData = <T>(collection: string, orderBy: keyof T, options: PaginatedDataHookOptions<T>) => {

    const {firstBatch, moreDataBatch, direction,customFetch} = options

    // Data
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMoreItems, setLoadingMoreItems] = useState(false)
    const [lastDocRef, setLastDocRef] = useState<any>()

    useEffect(() => {
        setLastDocRef(null)
        fetchFirstBatch()
    }, [direction, orderBy])


    const fetchThen = (querySnapshot: firebase.firestore.QuerySnapshot<T>) => {
            console.log("Fetched data: ", querySnapshot.docs.map(snap => snap.id))

            // Storing data
            setLoading(false)
            const docs = querySnapshot.docs.map(doc => doc.data());
            setData(docs)

            // Storing Ref to last object
            if (docs.length == 0) {
                setLastDocRef(null)
            } else {
                const ref = docs[docs.length - 1] as any
                setLastDocRef(ref[orderBy])
            }
        }

    // Main function
    // It fetches just the first batch of data
    const fetchFirstBatch = () => {
        setLoading(true)
        if (customFetch) {
            customFetch({
                collection:collection,
                withConvertedDefault: genericConverter,
                orderByDefault: orderBy.toString(),
                direction: direction,
                firstBatch: firstBatch,
                fetchThen: fetchThen
            })
        }else{
            FBFirestore.collection(collection)
                .withConverter(genericConverter<T>())
                .orderBy(orderBy.toString(), direction)
                .limit(firstBatch)
                .get()
                .then(fetchThen)
                .catch(e => {
                    console.log("Error fetch paginated data: ", e)
                })
        }

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
        loadingMoreItems,
    }
}

export const genericConverter = <T>() => ({
    toFirestore(modelObject: T): DocumentData {
        return modelObject
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
        const data = snapshot.data()
        data.uid = snapshot.id
        return data as T
    }
})

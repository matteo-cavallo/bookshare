import {useEffect, useState} from 'react';
import {isLoaded, useFirebase} from 'react-redux-firebase';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store.config';


export const useSplashScreen = () => {

    const firebase = useFirebase()

    const auth = useSelector((state: RootState) => state.firebase.auth)
    const profile = useSelector((state: RootState) => state.firebase.profile)

    const [loading, setLoading] = useState(false)
    const [isSigninAnonymously, setIsSigninAnonymously] = useState(false)

    useEffect(() => {
        if (auth.isEmpty && isLoaded(auth) && !isSigninAnonymously) {
            setIsSigninAnonymously(true)
            firebase.auth().signInAnonymously().then(value => {
                console.log("User logged anonymously. Id: ", value.user?.uid)
                setIsSigninAnonymously(false)
            })
        }
    }, [auth])

    useEffect(() => {
        if (isLoaded(auth) && isLoaded(profile) && !isSigninAnonymously) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [isLoaded(auth), isLoaded(profile)])


    return {
        loading,
        isSigninAnonymously
    }
}

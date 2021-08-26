import firebase from 'firebase';
import {UserModel} from '../model/user.model';

const converter: firebase.firestore.FirestoreDataConverter<UserModel> = {
    toFirestore(modelObject: UserModel): firebase.firestore.DocumentData {
        return modelObject
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): UserModel {
        return snapshot.data() as UserModel
    }
}

export const UserService = {
    converter
}

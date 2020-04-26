import { firebaseConfig } from './firebase-config';

import firebase from "firebase/app";
import "firebase/database";

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
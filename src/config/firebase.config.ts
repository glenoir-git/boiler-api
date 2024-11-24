import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount: ServiceAccount = require('./boiler-ia-firebase-adminsdk-7mno8-1a935b4bf0.json');

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
import { BadRequestExceptionCustom } from './../exceptions/bad-request.exception';
import { initializeApp } from "firebase/app";

export function initFirebase() {
  try {
    const clientConfig = {
      apiKey: process.env.PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    };
    initializeApp(clientConfig);
  } catch (error) {
    throw new BadRequestExceptionCustom('Firebase connection fail')
  }
}
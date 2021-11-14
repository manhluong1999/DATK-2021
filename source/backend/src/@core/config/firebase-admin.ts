import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
// Initialize the firebase agency
let config: admin.app.App;
dotenv.config();

try {
  const adminConfig: admin.ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
  config = admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
} catch (error) {
  console.log(`[FIREBASE_ADMIN_ERROR]: ${JSON.stringify(error)}`);
}

export const AdminFirebaseConfig = config;
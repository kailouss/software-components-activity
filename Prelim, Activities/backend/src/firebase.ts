import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("src/serviceAccountKey.json", "utf8")
) as ServiceAccount;

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore(app);

export { db };

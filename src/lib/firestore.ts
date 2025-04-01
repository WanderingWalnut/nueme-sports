import { db } from "./firebase";

import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    Timestamp,
    increment,
} from "firebase/firestore";

// Function to create a new session (pick-up soccer session) document --> stored in the session collection
export async function createSession( sessionData: {
    location: string;
    time: Date;
    status: string;
    createdBy: string;
    maxParticipants?: number;
}){
    try{
        // Sessions collection is automatically created if it does not exist
        const docRef = await addDoc(collection(db, "sessions"), {
            ...sessionData,
            time: Timestamp.fromDate(sessionData.time), // Convert into firestore timestamp
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            participantCount: 0,
        })
        console.log("Document successfully added", docRef.id);
        return docRef.id;
    }
        catch(err){
            console.log("Error creating session: ", err);
            throw err;
        }
}

export async function registerForSession(sessionId: string, userId: string) {
    try {
      // Add a document to the "participants" subcollection of the specified session.
      const participantRef = await addDoc(
        collection(db, "sessions", sessionId, "participants"),
        {
          userId,
          registrationStatus: "Registered",
          joinedAt: serverTimestamp(),
        }
      );
      console.log("Participant successfully registered: ", participantRef.id);
  
      // Increment the participants count on the session document.
      await updateDoc(doc(db, "sessions", sessionId), {
        participantsCount: increment(1),
        updatedAt: serverTimestamp(),
      });
  
      return participantRef.id;
    } catch (err) {
      console.error("Failed to register for the session: ", err);
      throw err; // Optionally re-throw the error for further handling.
    }
  }
  


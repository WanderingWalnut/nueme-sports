import { db } from "./firebase";

import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    Timestamp,
    increment,
    getDoc,
    setDoc,
    getDocs,
} from "firebase/firestore";

// Function to set a user as an admin
export async function setUserAsAdmin(userId: string, email: string): Promise<void> {
    try {
        // Create or update the user document in the users collection
        await setDoc(doc(db, "users", userId), {
            isAdmin: true,
            email: email,
            updatedAt: serverTimestamp(),
        }, { merge: true }); // merge: true allows updating existing document without overwriting other fields
        
        console.log(`User ${email} (${userId}) has been set as admin`);
    } catch (error) {
        console.error("Error setting user as admin:", error);
        throw error;
    }
}

// Function to check if a user is an admin
export async function isUserAdmin(userId: string): Promise<boolean> {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (!userDoc.exists()) {
            return false;
        }
        return userDoc.data()?.isAdmin || false;
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
}

// Function to create a new session (pick-up soccer session) document --> stored in the session collection
export async function createSession( sessionData: {
    location: string;
    time: Date;
    status: string;
    createdBy: string;
    maxParticipants?: number;
}){
    try{
        // Check if user is admin
        const isAdmin = await isUserAdmin(sessionData.createdBy);
        if (!isAdmin) {
            throw new Error("Only admins can create sessions");
        }

        // Log the user ID to verify authentication
        console.log("Creating session for user:", sessionData.createdBy);
        
        if (!sessionData.createdBy) {
            throw new Error("User must be authenticated to create a session");
        }

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

export async function getSessions() {
  try{
    const sessionsSnapshot = await getDocs(collection(db, "sessions"));
    const sessions = sessionsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        location: data.location,
        time: data.time.toDate(),
        participantsCount: data.participantCount || 0,
        registrationStatus: data.status || "Open"
      };
    });
    return sessions;
  }
  catch(err){
    console.error("Failed to retrieve sessions", err)
    throw err;
  }
}


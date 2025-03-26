import { db } from './firebase.js';
import { collection, doc, getDoc, getDocs, query, orderBy, setDoc } from "firebase/firestore";

// Načítanie účastníkov
export async function loadParticipants() {
  try {
    const q = query(collection(db, "participants"), orderBy("points", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error loading participants:", error);
    return [];
  }
}

// Načítanie jazdcov
export async function loadCurrentStandings() {
  try {
    const docRef = doc(db, "standings", "current");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().drivers : [];
  } catch (error) {
    console.error("Error loading standings:", error);
    return [];
  }
}

// Načítanie tímov
export async function loadConstructorStandings() {
  try {
    const docRef = doc(db, "standings", "constructors");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().teams : [];
  } catch (error) {
    console.error("Error loading constructor standings:", error);
    return [];
  }
}

// Načítanie kalendára
export async function loadCalendar() {
  try {
    const q = query(collection(db, "calendar"), orderBy("date"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error loading calendar:", error);
    return [];
  }
}

// Uloženie účastníka
export async function saveParticipant(participant) {
  try {
    await setDoc(doc(db, "participants", participant.name), participant);
    return true;
  } catch (error) {
    console.error("Error saving participant:", error);
    return false;
  }
}
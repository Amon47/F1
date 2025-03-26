// Firebase konfigurácia
const firebaseConfig = {
    apiKey: "AIzaSyCUsGzTFfDa2_3_WlB3_28bkPmeFPsPtnc",
    authDomain: "f1-tipovacka-9080c.firebaseapp.com",
    projectId: "f1-tipovacka-9080c",
    storageBucket: "f1-tipovacka-9080c.appspot.com",
    messagingSenderId: "271104172779",
    appId: "1:271104172779:web:fc62d45f4a7651f87414ae"
  };
  
  // Inicializácia Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Export služieb
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  // Auth state listener
  auth.onAuthStateChanged((user) => {
    const authStatus = document.getElementById('auth-status');
    if (user) {
      authStatus.innerHTML = `Prihlásený ako: ${user.email}`;
      document.getElementById('admin-controls')?.classList.toggle('hidden', user.email !== 'admin@example.com');
    } else {
      authStatus.innerHTML = '';
    }
    document.getElementById('loading-overlay').style.display = 'none';
  });
  
  // Globálny prístup pre debug
  window.firebase = firebase;
  window.db = db;
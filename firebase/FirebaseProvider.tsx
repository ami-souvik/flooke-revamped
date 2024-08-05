import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { RealtimeDBProvider } from './RealtimeDBProvider';

const FirebaseCtxt = createContext({});

export function FirebaseProvider({ children }) {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    signInWithEmailAndPassword(auth, 'dsouvik141@gmail.com', 'flooke@2024')
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, []);
  return (
    <FirebaseCtxt.Provider value={{ user }}>
      <RealtimeDBProvider>{children}</RealtimeDBProvider>
    </FirebaseCtxt.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseCtxt);
}

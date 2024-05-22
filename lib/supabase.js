import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import {REACT_NATIVE_SUPABASE_URL,REACT_NATIVE_SUPABASE_ANON_KEY} from '@env'
const supabaseUrl = REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})


export const createUser = async (email, password, username) => {
  try {
    // Sign up the user in Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) throw new Error(signUpError.message);

    const user = data.user;
    if (!user) throw new Error('No user returned from sign up.');

    // Insert the user into the custom 'users' table
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ username, email }]);

    if (insertError) throw new Error(insertError.message);

    return { ...user, username };
  } catch (err) {
    console.error('Error signing up:', err.message);
    throw err;
  }
};

  
  export const signIn = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) throw new Error(error.message);
      return user;
    } catch (err) {
      console.error('Error signing in:', err.message);
      throw err;
    }
  };
  
  export const getCurrentUser = () => {
    return supabase.auth.user();
  };
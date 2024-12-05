import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase'; // Adjust the path to your Firebase config


// Firebase authentication function
const loginUser = async (email, password) => {
  const userCredentials = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredentials.user.getIdToken();
  
  
  return {
    id: userCredentials.user.uid,
    email: userCredentials.user.email,
    token,
  };
};

// NextAuth configuration
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Missing credentials');
        const { email, password } = credentials;

        try {
          const user = await loginUser(email, password);
          
          
          return user; // This user will be passed to the jwt callback
         
          
        } catch (err) {
          console.error('Firebase login error:', err);
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// this is a dynamic route. the naming is the current best practice method
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			// the clientId and secret come from the google console.
			// go to console.cloud.google.com and make a new project. then go to APIs and services, then OAuth consent screen, create, add in the app name under app information, continue
			// go to Credentials on the left, create credentials, type in http://localhost:3000 as a URI, then get the keys
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			// store the user id from MongoDB to session
			const sessionUser = await User.findOne({ email: session.user.email });
			session.user.id = sessionUser._id.toString();

			return session;
		},
		async signIn({ account, profile, user, credentials }) {
			try {
				await connectToDB();

				// check if a user already exists
				const userExists = await User.findOne({
					email: profile.email,
				});

				// if not, create a new user
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
					});
				}

				return true;
			} catch (error) {
				console.log("Error checking if user exists: ", error.message);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };

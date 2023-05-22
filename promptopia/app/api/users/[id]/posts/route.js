import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// This is basically the same route as 'fetch all users' in the api/prompt, but instead of grabbing ALL posts, we're just grabbing the posts for the user that is signed in.

export const GET = async (request, { params }) => {
	try {
		await connectToDB();
		// find the prompts where the id of the creator equals the id in the route params
		const prompts = await Prompt.find({
			creator: params.id,
		}).populate("creator");

		return new Response(JSON.stringify(prompts), {
			status: 200,
		});
	} catch (error) {
		return new Response("Failed to fetch all prompts", {
			status: 500,
		});
	}
};

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// GET one specific post

export const GET = async (request, { params }) => {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(params.id).populate("creator");
		if (!prompt) return new Response("Prompt not found", { status: 404 });

		return new Response(JSON.stringify(prompt), {
			status: 200,
		});
	} catch (error) {
		return new Response("Failed to fetch prompt", {
			status: 500,
		});
	}
};

// PATCH udpate one specific post
// Patch vs put: looks like 'put' replaces the entire resource, 'patch' updates just a section. So 'put' changes the whole thing, 'patch' does a partial change
export const PATCH = async (request, { params }) => {
	const { prompt, tag } = await request.json();

	try {
		await connectToDB();
		const existingPrompt = await Prompt.findById(params.id);
		if (!existingPrompt)
			return new Response("Prompt not found", { status: 404 });

		// here, the prompt/tag on the right side of the equals is the prompt/tag that we'll pass it, the one that the user has updated.
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();
		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to update prompt", {
			status: 500,
		});
	}
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
	try {
		await connectToDB();

		await Prompt.findByIdAndRemove(params.id);

		return new Response("Prompt deleted successfully", { status: 200 });
	} catch (error) {
		return new Response("Failed to delete prompt", {
			status: 500,
		});
	}
};

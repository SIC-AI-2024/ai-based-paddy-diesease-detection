// app/api/preview/route.ts
import axios from "axios";
import { load } from "cheerio"; // Correct named import

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
    });
  }

  try {
    const { data } = await axios.get(url);
    const $ = load(data);

    // Extract title
    const title = $("head > title").text();

    // Extract description from meta tag
    const description = $('meta[name="description"]').attr("content");
    // Limit the description to 50 words
    const limitedDescription = description
      ? description.split(" ").slice(0, 50).join(" ") // Split by space, slice to 50 words, and join back
      : ""; // If no description, set to an empty string
    // Extract image from Open Graph or other meta tags
    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="image"]').attr("content") ||
      "/images/default_link.jpg";

    return new Response(
      JSON.stringify({ title, description: limitedDescription, image }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch link metadata" }),
      { status: 500 }
    );
  }
}

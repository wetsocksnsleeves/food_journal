export async function POST(request: Request) {
    const imageData = await request.json();

    const query = `
    You are a nutrition estimation assistant. Analyze the image and estimate the calories of the food shown.

    Follow these instructions carefully:

    1. Identify the food or dish as accurately as possible.
    2. Use visual scale references (plate size, utensil size, hand size, table texture, etc.) to estimate portion size.
    3. Estimate:
       - the portion weight in grams,
       - the cooking method,
       - visible ingredients,
       - and any sauces or sides.
    4. Use known nutritional averages to calculate an estimated total calorie count.
    5. If uncertain, give a confidence percentage.

    Return the final answer **only** in the following JSON format (no other text):

    {
      "name": "<name of the food>",
      "ingredients": ["<ingredient1>", "<ingredient2>"],
      "cooking_method": "<method>",
      "estimated_weight_grams": <number>,
      "estimated_calories": <number>,
      "confidence": "<percentage>"
    }
    `;

    let response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "x-ai/grok-4.1-fast",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: query,
                            },
                            {
                                type: "image_url",
                                image_url: { url: imageData.data },
                            },
                        ],
                    },
                ],
                reasoning: { enabled: true },
            }),
        },
    );

    // Extract the assistant message with reasoning_details and save it to the response variable
    const result = await response.json();
    return Response.json(result.choices[0].message.content);
}

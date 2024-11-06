import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const file = formData.get("image");

  // Ensure we have the file and that it’s a Blob
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { error: "File not found or incorrect format" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "http://ec2-54-144-204-21.compute-1.amazonaws.com:9090/predict",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

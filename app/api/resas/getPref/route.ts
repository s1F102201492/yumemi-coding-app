import { NextResponse } from "next/server";

// 都道府県のデータを取得するためのAPI
export const GET = async () => {
  try {
    const apiKey = process.env.API_SECRET_KEY;
    const apiEndPoint = process.env.NEXT_PUBLIC_API_PREF_POINT;

    // API keyがない場合
    if (!apiKey) {
      console.error("API keyがありません。");
      return NextResponse.json(
        { error: "API keyがありません。" },
        { status: 500 },
      );
    }

    // API Endpointがない場合
    if (!apiEndPoint) {
      console.error("API URLがありません。");
      return NextResponse.json(
        { error: "API URLがありません。" },
        { status: 500 },
      );
    }

    const res = await fetch(apiEndPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-API-KEY": `${apiKey}`,
      },
    });

    const data = await res.json();

    //API処理が正常にできない場合
    if (!res.ok) {
      console.error(`APIリクエスト失敗: ${res.status} ${res.statusText}`);
      const errorData = await res.json();
      console.error("エラーメッセージ:", errorData);

      return NextResponse.json(
        { error: "APIリクエストに失敗しました。" },
        { status: res.status },
      );
    }

    return NextResponse.json({ message: "success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

// pages/api/postImage.js
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const postContent = searchParams.get("content") || "Your post content here";
  const createdBy = searchParams.get("created_by") || "Anonymous";
  const distance = searchParams.get("distance") || "0 km";
  const timeAgo = searchParams.get("time_ago") || "0 min";
  const score = searchParams.get("score") || "0";
  const comments = searchParams.get("comments") || "0";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          backgroundColor: "#243546",
          color: "#DEE7EA",
          borderRadius: "8px",
          width: "600px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#101B23",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#DEE7EA",
              fontSize: "16px",
            }}
          >
            😊
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <p style={{ fontSize: "14px", margin: 0 }}>{createdBy}</p>
              <p style={{ fontSize: "12px", color: "#4F7396", margin: 0 }}>
                ~{distance} Km
              </p>
            </div>
            <p style={{ fontSize: "12px", color: "#4F7396", margin: 0 }}>
              {timeAgo} ago
            </p>
          </div>
        </div>

        <p style={{ fontSize: "16px", margin: "16px 0", color: "#DEE7EA" }}>
          {postContent}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #101B23",
            paddingTop: "12px",
            fontSize: "12px",
            color: "#4F7396",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            👍
            <p style={{ fontSize: "14px", margin: "0 8px", color: "#DEE7EA" }}>
              {score}
            </p>
            👎
          </div>
          <div style={{ display: "flex" }}>{comments} comments</div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 32 + 32 + 14 + 48 + 28 * Math.ceil(postContent.length / 70),
    }
  );
}

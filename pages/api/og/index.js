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
          backgroundColor: "#F7EBFF",
          color: "#DEE7EA",
          borderRadius: "8px",
          width: "600px",
          fontFamily: "Arial, sans-serif",
          border: "3px solid #5F489D",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#5F489D",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F7EBFF",
              fontSize: "16px",
            }}
          >
            <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="PersonOutlinedIcon"
            >
              <path
                style={{ color: "#F7EBFF" }}
                d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
              ></path>
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <p
                style={{
                  fontSize: "14px",
                  margin: 0,
                  color: "#333333",
                  fontWeight: "600",
                }}
              >
                {createdBy}
              </p>
              <p style={{ fontSize: "12px", color: "#5F489D", margin: 0 }}>
                ~{distance} Km
              </p>
            </div>
            <p style={{ fontSize: "12px", color: "#5F489D", margin: 0 }}>
              {timeAgo} ago
            </p>
          </div>
        </div>

        <p style={{ fontSize: "16px", margin: "16px 0", color: "#333333" }}>
          {postContent}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "12px",
            fontSize: "12px",
            color: "#4F7396",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", color: "#998BBF" }}
          >
            <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-[36px] text-light-purple css-1umw9bq-MuiSvgIcon-root"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="KeyboardArrowUpOutlinedIcon"
            >
              <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
            </svg>
            <p style={{ fontSize: "14px", margin: "0 8px", color: "#5F489D" }}>
              {score}
            </p>
            <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-[36px] text-light-purple css-1umw9bq-MuiSvgIcon-root"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="KeyboardArrowDownOutlinedIcon"
            >
              <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
            </svg>
          </div>
          <div style={{ display: "flex" }}>{comments} comments</div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: "auto",
    }
  );
}

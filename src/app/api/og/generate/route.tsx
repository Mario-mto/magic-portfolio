import { ImageResponse } from "next/og";
import { baseURL, person } from "@/resources";

export const runtime = "nodejs";

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Portfolio";

  async function loadGoogleFont(font: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status == 200) {
        return await response.arrayBuffer();
      }
    }

    throw new Error("failed to load font data");
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "6rem",
        background: "#070809",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "3rem",
          fontStyle: "normal",
          color: "white",
        }}
      >
        <span
          style={{
            fontSize: "1.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5eead4",
            fontWeight: 600,
          }}
        >
          Applied AI Engineer
        </span>
        <span
          style={{
            fontSize: "6rem",
            lineHeight: "7rem",
            letterSpacing: "-0.05em",
            whiteSpace: "pre-wrap",
            overflow: "hidden",
            color: "white",
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3rem",
            marginTop: "1rem",
          }}
        >
          <img
            src={baseURL + person.avatar}
            style={{
              width: "10rem",
              height: "10rem",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "3.5rem",
                lineHeight: "4rem",
                color: "white",
              }}
            >
              {person.name}
            </span>
            <span
              style={{
                fontSize: "2rem",
                lineHeight: "2.5rem",
                color: "#5eead4",
                opacity: "0.85",
              }}
            >
              {person.role}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist:wght@400"),
          style: "normal",
        },
      ],
    },
  );
}

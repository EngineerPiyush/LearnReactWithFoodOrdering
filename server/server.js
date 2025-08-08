import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/restaurants", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Swiggy fetch failed: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).send("Error fetching data");
  }
});
app.get("/restaurants/:resId", async (req, res) => {
  const { resId } = req.params;

  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${resId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Swiggy menu fetch failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Menu fetch error:", err);
    res.status(500).send("Error fetching menu");
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Proxy server running at http://localhost:${PORT}`)
);

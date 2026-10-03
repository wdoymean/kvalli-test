import express from "express";

export const app = express();
app.use(express.json());

type Order = { id: string; status: "new" | "paid" | "shipped" | "cancelled"; owner: string };
const orders = new Map<string, Order>([["42", { id: "42", status: "paid", owner: "ada" }]]);

app.get("/api/v2/orders/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "ORDER_NOT_FOUND" });
  res.json(order);
});

app.post("/api/v2/orders/:id/cancel", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "ORDER_NOT_FOUND" });
  const reason = String(req.body?.reason ?? "");
  if (reason.length < 3 || reason.length > 500) return res.status(422).json({ error: "REASON_REQUIRED" });
  if (order.status === "shipped") return res.status(409).json({ error: "ORDER_ALREADY_SHIPPED" });
  order.status = "cancelled";
  res.json({ id: order.id, status: order.status, refund: "pending" });
});

app.post("/api/v1/auth/login", (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password || String(password).length < 8) return res.status(400).json({ error: "INVALID_INPUT" });
  if (password !== "correct-horse") return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  res.json({ token: "session-token" });
});

app.get("/api/v1/catalog", (_req, res) => res.json([{ sku: "A1", title: "Kettle" }]));

if (process.argv[1]?.endsWith("app.ts")) app.listen(3000);

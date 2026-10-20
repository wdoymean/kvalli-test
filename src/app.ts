import express from "express";

export const app = express();
app.use(express.json());

type Order = { id: string; status: "new" | "paid" | "shipped" | "cancelled"; owner: string };
const orders = new Map<string, Order>([
  ["42", { id: "42", status: "paid", owner: "ada" }],
  ["43", { id: "43", status: "paid", owner: "bob" }],
  ["44", { id: "44", status: "paid", owner: "cy" }],
]);

// The order page: its status, cancelling it with a reason, and its invoice.
app.get("/orders/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).type("html").send("<!doctype html><title>Not found</title><h1>Order not found</h1>");
  res.type("html").send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Order ${order.id}</title></head>
<body>
  <main>
    <h1>Order ${order.id}</h1>
    <p>Owner: ${order.owner}</p>
    <p>Status: <span data-testid="order-status">${order.status}</span></p>
    <form id="cancel-form">
      <label for="reason">Reason for cancelling</label>
      <input id="reason" name="reason">
      <button type="submit">Cancel order</button>
    </form>
    <button type="button" id="invoice">Download invoice</button>
    <p role="status" id="message"></p>
  </main>
  <script>
    const id = ${JSON.stringify(order.id)};
    const message = document.getElementById("message");
    document.getElementById("cancel-form").addEventListener("submit", async event => {
      event.preventDefault();
      const res = await fetch("/api/v2/orders/" + id + "/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: document.getElementById("reason").value })
      });
      const body = await res.json();
      if (res.ok) {
        document.querySelector("[data-testid=order-status]").textContent = body.status;
        message.textContent = "Order cancelled. The refund is " + body.refund + ".";
      } else {
        message.textContent = body.error === "REASON_REQUIRED" ? "Give a reason of 3 to 500 characters." : "The order could not be cancelled: " + body.error;
      }
    });
    document.getElementById("invoice").addEventListener("click", async () => {
      const res = await fetch("/api/v2/orders/" + id + "/invoice");
      message.textContent = res.ok ? "Invoice for order " + id + " is ready." : "The invoice could not be loaded.";
    });
  </script>
</body>
</html>`);
});

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

// Known defect: the invoice endpoint is not finished and fails for every order.
app.get("/api/v2/orders/:id/invoice", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "ORDER_NOT_FOUND" });
  res.status(500).json({ error: "INTERNAL_ERROR" });
});

app.get("/api/v1/catalog", (_req, res) => res.json([{ sku: "A1", title: "Kettle" }]));

if (process.argv[1]?.endsWith("app.ts")) app.listen(3000);

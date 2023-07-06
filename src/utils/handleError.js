export default function handleError(res, message = "Bad Request", code = 403) {
  return res
    .status(code)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ error: message });
}

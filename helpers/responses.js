const ok = (res, message, data) => {
  return res
    .status(200)
    .json({ message: message || "Success", data: data || [] });
};

const error_404 = (res, message, data) => {
  return res
    .status(404)
    .json({ message: message || "Not found", data: data || [] });
};

const bad_request = (res, message, data) => {
  return res
    .status(403)
    .json({ message: message || "Bad request", data: data || [] });
};

const created = (res, message, data) => {
  return res
    .status(201)
    .json({ message: message || "Created successfully", data: data || [] });
};

const server_error = (res, message, data) => {
  return res
    .status(500)
    .json({ message: message || "internal server error", data: data || [] });
};

const unauthorized = (res, message, data) => {
  return res
    .status(401)
    .json({ message: message || "Not authorized", data: data || [] });
};

module.exports = {
  ok,
  error_404,
  bad_request,
  created,
  server_error,
  unauthorized,
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    code: err.statusCode || 500,
    msg: err.message || "Something wrong, try again later",
  };

  if (err.name === "ValidationError") {
    defaultError.code = 400;
    defaultError.msg = err.errors;
  }

  res.status(defaultError.code).json({ msg: defaultError.msg });
};
export { errorHandler };

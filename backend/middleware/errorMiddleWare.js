// // const notFound = (req, res, next) => {
// //   console.log("not found handler called");
// //   const err = new Error(`Not Found - ${req.originalUrl}`);
// //   res.status(404);
// //   next(err);
// // };

// const errorHandler = (err, req, res, next) => {
//   console.log("error handler called", err);
//   // const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   // res.status(statusCode);
//   // res.json({
//   //   message: err.message,
//   //   stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   // });
//   // next();

//   const defaultError = {
//     code: err.statusCode || 500,
//     msg: err.message || "Something wrong, try again later",
//   };
//   if (err.name === "ValidationError") {
//     defaultError.code = 400;
//     defaultError.msg = err.errors;
//   }
//   res.status(defaultError.code).json({ msg: defaultError.msg });
// };
// export { notFound, errorHandler };

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
  next();
};

export { errorHandler };

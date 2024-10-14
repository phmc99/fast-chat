export class AppError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const errorHandler = (error, req, res, next) => {
  console.error(error, "\n\n");

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "General error",
    message: "Internal server error",
  });
};

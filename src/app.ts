import express, { Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";

const app = express();

app.get("/", (req, res, next) => {
    const err = createHttpError(401, "You can't access this route");
    next(err);
});

// global error handler middleware - it should be in the last of file
app.use((err: HttpError, req: Request, res: Response) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: "",
                location: "",
            },
        ],
    });
});

export default app;

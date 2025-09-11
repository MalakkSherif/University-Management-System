const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "ERROR",
                errorMessage: "Please login to access this route",
            });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: "ERROR",
                    errorMessage: "Invalid or expired token",
                });
            }

            req.user = {
                id: decoded.id,
                role: decoded.role,
            };

            next();
        });
    } catch (err) {
        return res.status(500).json({
            status: "ERROR",
            errorMessage: err.message,
        });
    }
};

function restrictTo(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {  
            return res.status(403).json({
                status: "ERROR",
                errorMessage: `You don't have permission to perform this action`
            });
        }
        next();
    };
}

module.exports = {authMiddleware , restrictTo};

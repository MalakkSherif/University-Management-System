const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ error: 'No user role found' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'You do not have permission' });
        }

        next();
    };
};

module.exports = { restrictTo };
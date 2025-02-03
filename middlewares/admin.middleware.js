const adminAuth = (req, res, next) => {
    if (req.headers['x-api-key'] !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    next();
};

export default adminAuth;
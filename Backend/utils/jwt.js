import jwt from 'jsonwebtoken'



export const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {id: user._id, username: user.username, role: user.role},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '7d'}
    );
}


export const verifyToken = (token, isRefreshToken = false) => {
      const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
    return jwt.verify(token, secret);
}
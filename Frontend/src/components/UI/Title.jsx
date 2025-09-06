const Title = ({ user }) => {
    return (
        <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-4xl w-9/10 bg-gradient-to-r from-red-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {
                !user ? <>Meet Gemini<br />Your Personal AI Assistant</>
                : <>Hi {user.firstName}, <br /> Welcome to Gemini</>
                }
            </h1>
        </div>
    );
};

export default Title;
export default function FormExtra(){
    return(
        <div className="flex">
            <div className="flex">
            <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-white hover:text-cyan-200">
                Remember me
            </label>
        </div>

        <div className="text-sm ml-4">
            <a href="#" className="font-medium text-white hover:text-cyan-200">
                Forgot your password?
            </a>
            </div>
        </div>
    )
}
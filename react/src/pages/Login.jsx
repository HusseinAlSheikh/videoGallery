import {Link} from 'react-router-dom';
export default function Login() {
    return (
        <>
            <form>
                <div className="mb-6">
                    <input
                        type="email"
                        placeholder="Email"
                        className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none"
                    />
                </div>
                <div className="mb-10">
                    <input
                        type="submit"
                        value="Sign In"
                        className="bordder-primary w-full cursor-pointer rounded-md border bg-primary py-3 px-5 text-base text-white transition duration-300 ease-in-out hover:shadow-md"
                    />
                </div>
            </form>
            <p className="text-base text-[#adadad]">
                Not a member yet?
                <Link to="/signup" className="text-primary hover:underline">
                    Sign Up
                </Link>
            </p>
        </>
    );
}
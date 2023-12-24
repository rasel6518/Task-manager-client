import { useContext } from "react";
import { AiFillGithub } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Register = () => {
    const { createUser, logout, googleSignin, githubSignin } = useContext(AuthContext)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()


    // Social login
    const handleGoogleSignIn = () => {
        googleSignin()
            .then(result => {

                console.log(result);


                navigate(location?.state ? location.state : '/')
                toast.success(' Google Signin  Successful');
            })
            .catch(err => {
                console.log(err);

            })


    }
    const handleGithubSignIn = () => {
        githubSignin()
            .then(result => {

                console.log(result);


                navigate(location?.state ? location.state : '/')
                toast.success(' GitHub Signin  Successful');
            })
            .catch(err => {
                console.log(err);

            })


    }




    const handleSignup = (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const name = form.get("name");
        const photourl = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        console.log(name, photourl, email, password);

        // Password validation
        const hasMinLength = password.length >= 6;
        const hasCapitalLetter = /[A-Z]/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*()_+]/.test(password);

        if (!hasMinLength) {
            toast("Password must be at least 6 characters long.");
            return;
        }

        if (!hasCapitalLetter) {
            toast("Password must contain at least one capital letter.");
            return;
        }

        if (!hasSpecialCharacter) {
            toast("Password must contain at least one special character.");
            return;
        }

        createUser(email, password)
            .then((result) => {
                const signUpUser = result.user;

                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photourl,
                })
                    .then(() => {
                        const userInfo = {
                            name,
                            email,
                            userImage: photourl

                        }
                        console.log(userInfo)

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {

                                    toast.success('Account Successfully Created. Start Exploring!')
                                    logout()

                                    navigate(location?.state ? location.state : '/login')
                                }
                            })


                    })
                    .catch((err) => console.log(err.message));


            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                console.log(errorMessage, errorCode);

            });

        // e.currentTarget.reset();
        toast.success("Registration successful!");
    };


    return (
        <div className="my-5">

            <section className="flex flex-col md:flex-row  items-center">



                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3  px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

                    <div className="w-full h-5/6">


                        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-5">Log in to your account</h1>

                        <form onSubmit={handleSignup} className="mt-6" >
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <input type="text" name="name" id="" placeholder="Enter Full Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#52ab98] focus:bg-white focus:outline-none" autoFocus autoComplete required />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input type="email" name="email" id="" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#52ab98] focus:bg-white focus:outline-none" autoFocus autoComplete required />
                            </div>
                            <div>
                                <label className="block text-gray-700">Photo URL</label>
                                <input type="text" name="photo" id="" placeholder="Enter Photo URL" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#52ab98] focus:bg-white focus:outline-none" autoFocus autoComplete required />
                            </div>

                            <div className="">
                                <label className="block text-gray-700">Password</label>
                                <input type="password" name="password" id="" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#52ab98]
                focus:bg-white focus:outline-none" required />
                            </div>

                            <div className="text-right mt-2">
                                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-[#52ab98] focus:text-blue-700">Forgot Password?</a>
                            </div>

                            <button type="submit" className="w-full block bg-[#52ab98] hover:bg-[#6ec0af] focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Sign Up</button>
                        </form>

                        <hr className="my-6 border-gray-300 w-full" />

                        <button onClick={handleGoogleSignIn} type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                            <div className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible" /></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" /><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg>
                                <span className="ml-4">
                                    Log in
                                    with
                                    Google</span>
                            </div>
                        </button>
                        <button onClick={handleGithubSignIn} type="button" className="w-full block mt-5 bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                            <div className="flex items-center justify-center">
                                <AiFillGithub className="text-2xl"></AiFillGithub>
                                <span className="ml-4">
                                    Log in
                                    with
                                    GitHub</span>
                            </div>
                        </button>
                        <p className="mt-4 text-center">Have already account? <Link to='/login' className="text-blue-500 hover:text-blue-700 font-semibold">Log In</Link></p>



                    </div>
                </div>

            </section>

            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light">

            </ToastContainer>
        </div>
    );
};

export default Register;
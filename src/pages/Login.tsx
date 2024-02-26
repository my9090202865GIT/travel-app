import { FC, FormEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { doLogin, doSignUp, updateModal } from "../redux/features/authSlice";
import Signup from './../components/SignUp';

const LoginModal: FC = () => {
   const [clicked, setClicked] = useState(false);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useAppDispatch();
   const open = useAppSelector((state) => state.AuthReducer.modalOpen);

   useEffect((): void => {
      if (localStorage.getItem("username")) {
         console.log("User is already logged in.");
         const username = localStorage.getItem('username');
         const password = localStorage.getItem('password');
         const email = localStorage.getItem('email');
         dispatch(doSignUp({ username, password, email }));
      }
   }, [])
   const submitForm = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(doLogin({ username, password }));
   };

   if (open) {
      return (
         <div className="bg-[#0000007d] w-full min-h-screen fixed inset-0 z-30 flex items-center justify-center font-karla">
            <div
               className="relative border shadow rounded p-8 bg-white max-w-md w-full z-40"
               data-test="login-container"
            >
               <span
                  className="absolute cursor-pointer right-5 top-5 hover:opacity-85"
                  onClick={() => {
                     setClicked(false);
                     dispatch(updateModal(false))
                  }}
               >Close</span>
               {clicked ? (
                  <>
                     <div className="flex mb-2 space-x-2 justify-center items-center">
                        <h3 className="font-bold text-center text-xl">Register</h3>
                     </div>
                     <Signup closehandler={() => setClicked(false)} />
                     <p className="leading-4">
                        <span
                           className="text-blue-500 cursor-pointer hover:underline"
                           onClick={() => setClicked(false)}
                        >
                           Go to login
                        </span>
                     </p>
                  </>
               ) : (
                  <>
                     <div className="flex mb-2 space-x-2 justify-center items-center">
                        <h3 className="font-bold text-center text-2xl">Login</h3>
                     </div>
                     <form onSubmit={submitForm} className="flex flex-col space-y-3">
                        <div className="relative">
                           <input
                              data-test="input-username"
                              type="text"
                              placeholder="username..."
                              className="border w-full border-black py-2 px-8 rounded"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                           />
                        </div>
                        <div className="relative">
                           <input
                              data-test="input-password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              type="password"
                              placeholder="password..."
                              className="border w-full border-black py-2 px-8 rounded"
                           />
                        </div>
                        <input
                           data-test="input-submit"
                           type="submit"
                           value="Submit"
                           className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
                        />
                     </form>
                     <p className="text-center mt-1">
                        No Account?{" "}
                        <span
                           className="text-blue-500 cursor-pointer"
                           onClick={() => setClicked(true)}
                        >
                           Register
                        </span>
                     </p>
                  </>
               )}
            </div>
         </div>
      );
   }
};

export default LoginModal;

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Users } from "lucide-react";
// import LoginForm from "@/components/auth/LoginForm";

// export default function HomePage() {
//   const [authMode, setAuthMode] = useState<"login" | "signup">("login");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <div className="p-3 bg-blue-100 rounded-full">
//               <Users className="h-8 w-8 text-blue-600" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             User Management System
//           </h1>
//           <p className="text-gray-600">
//             {authMode === "login"
//               ? "Sign in to your account"
//               : "Create a new account"}
//           </p>
//         </div>

//         {authMode === "login" ? <LoginForm /> : <SignupForm />}

//         <div className="mt-6 text-center">
//           <Button
//             variant="link"
//             onClick={() =>
//               setAuthMode(authMode === "login" ? "signup" : "login")
//             }
//             className="text-blue-600 hover:text-blue-800"
//           >
//             {/* {authMode === "login"
//               ? "Don't have an account? Sign up"
//               : "Already have an account? Sign in"} */}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export default function HomePage() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-1"> {/* Reduced from mb-2 to mb-1 */}
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Management System
          </h1>
          <p className="text-gray-600">
            {authMode === "login"
              ? "Sign in to your account"
              : "Create a new account"}
          </p>
        </div>

        {authMode === "login" ? <LoginForm /> : <SignupForm />}

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
            className="text-blue-600 hover:text-blue-800"
          >
            {/* {authMode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"} */}
          </Button>
        </div>
      </div>
    </div>
  );
}
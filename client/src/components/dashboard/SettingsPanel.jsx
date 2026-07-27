import { 
  User,
  ShieldCheck,
  Bell,
  Moon,
  Lock,
  ChevronRight
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { changePassword } from "../../services/authService";


function SettingsPanel(){

const { user } = useAuth();
const navigate = useNavigate();

const token = localStorage.getItem("flowforge_token");


const [notifications,setNotifications] = useState(true);


const [darkMode,setDarkMode] = useState(
document.documentElement.classList.contains("dark")
);


const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const [passwordMessage,setPasswordMessage] = useState("");





function toggleDark(){

if(darkMode){

document.documentElement.classList.remove("dark");

}else{

document.documentElement.classList.add("dark");

}

setDarkMode(!darkMode);

}





async function handlePasswordChange(e){

e.preventDefault();


if(newPassword !== confirmPassword){

setPasswordMessage(
"New password does not match"
);

return;

}


try{


const res = await changePassword(
token,
{
oldPassword,
newPassword
}
);



if(res.success){

setPasswordMessage(
"Password changed successfully"
);


setOldPassword("");
setNewPassword("");
setConfirmPassword("");

}


}catch(error){

setPasswordMessage(
error.response?.data?.message ||
"Password change failed"
);

}


}




return (

<div className="p-6 space-y-6">



{/* HEADER */}

<div>

<h1 className="
text-3xl 
font-bold 
text-slate-900 
dark:text-white
">

Settings

</h1>


<p className="
text-slate-500 
dark:text-slate-400 
mt-2
">

Manage your FlowForge account settings

</p>


</div>







{/* ACCOUNT */}


<div className="
bg-white
dark:bg-slate-900
border
border-slate-200
dark:border-slate-700
rounded-3xl
p-6
shadow-sm
">


<div className="flex gap-3 items-center mb-6">

<User className="text-emerald-500"/>

<h2 className="
text-xl 
font-bold
dark:text-white
">

Account

</h2>

</div>





<div className="flex justify-between items-center">


<div>


<h3 className="
font-semibold
dark:text-white
">

{user?.firstName} {user?.lastName}

</h3>


<p className="text-sm text-slate-500">

{user?.email}

</p>


</div>



<button

onClick={()=>navigate("/profile")}

className="
flex
items-center
gap-2
bg-emerald-500
text-white
px-5
py-2
rounded-xl
hover:bg-emerald-600
"

>

Edit Profile

<ChevronRight size={18}/>

</button>


</div>


</div>










{/* SECURITY */}


<div className="
bg-white
dark:bg-slate-900
border
border-slate-200
dark:border-slate-700
rounded-3xl
p-6
shadow-sm
">


<div className="flex gap-3 items-center mb-6">


<ShieldCheck className="text-blue-500"/>


<h2 className="
text-xl
font-bold
dark:text-white
">

Security

</h2>


</div>





<form
onSubmit={handlePasswordChange}
className="space-y-4"
>



<input

type="password"

placeholder="Current Password"

value={oldPassword}

onChange={(e)=>setOldPassword(e.target.value)}

className="
w-full
rounded-xl
border
border-slate-200
dark:border-slate-700
bg-slate-50
dark:bg-slate-800
p-3
dark:text-white
"

/>





<input

type="password"

placeholder="New Password"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

className="
w-full
rounded-xl
border
border-slate-200
dark:border-slate-700
bg-slate-50
dark:bg-slate-800
p-3
dark:text-white
"

/>





<input

type="password"

placeholder="Confirm New Password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

className="
w-full
rounded-xl
border
border-slate-200
dark:border-slate-700
bg-slate-50
dark:bg-slate-800
p-3
dark:text-white
"

/>





{
passwordMessage &&

<p className="
text-sm
text-emerald-600
">

{passwordMessage}

</p>

}





<button

className="
flex
items-center
justify-center
gap-2
w-full
bg-slate-900
dark:bg-emerald-500
text-white
rounded-xl
py-3
font-semibold
"

>


<Lock size={18}/>

Change Password


</button>


</form>


</div>









{/* PREFERENCES */}


<div className="
bg-white
dark:bg-slate-900
border
border-slate-200
dark:border-slate-700
rounded-3xl
p-6
shadow-sm
">


<div className="flex gap-3 items-center mb-6">


<Bell className="text-yellow-500"/>


<h2 className="
text-xl
font-bold
dark:text-white
">

Preferences

</h2>


</div>





<div className="flex justify-between items-center mb-6">


<div>

<h3 className="dark:text-white font-semibold">

Notifications

</h3>


<p className="text-sm text-slate-500">

Receive updates and alerts

</p>


</div>



<button

onClick={()=>setNotifications(!notifications)}

className={`
w-14
h-7
rounded-full
${notifications
?"bg-emerald-500"
:"bg-slate-300"}
`}

>


<div

className={`
h-6
w-6
bg-white
rounded-full
transition
${notifications
?"translate-x-7"
:"translate-x-1"}
`}

/>


</button>


</div>






<div className="flex justify-between items-center">


<div>

<h3 className="dark:text-white font-semibold">

Dark Mode

</h3>

<p className="text-sm text-slate-500">

Change appearance

</p>

</div>




<button

onClick={toggleDark}

className="
flex
items-center
gap-2
px-5
py-2
rounded-xl
bg-slate-100
dark:bg-slate-800
dark:text-white
"

>

<Moon size={16}/>

{darkMode?"Dark":"Light"}

</button>


</div>



</div>



</div>

)

}


export default SettingsPanel;
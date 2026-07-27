import Layout from "../layout/Layout";
import {
  Search,
  BookOpen,
  Mail,
  MessageCircle,
  Video,
  Bug,
  Phone,
  ChevronDown,
  X,
  Send
} from "lucide-react";

import {useState} from "react";


function Help() {


const [search,setSearch]=useState("");

const [chat,setChat]=useState(false);

const [bug,setBug]=useState(false);

const [message,setMessage]=useState("");



const faqs=[

{
q:"How do I create a new project?",
a:"Go to Projects page and click New Project button."
},

{
q:"How can I assign tasks?",
a:"Open Tasks page and edit any task."
},

{
q:"Can I export reports?",
a:"Yes, Reports page contains export options."
},

{
q:"How do I invite team members?",
a:"Open Team page and click Add Member."
}

];




const openDocs=()=>{

window.open(
"https://flowforge.com/docs",
"_blank"
);

};


const openVideo=()=>{

window.open(
"https://youtube.com",
"_blank"
);

};



const emailSupport=()=>{

window.location.href=
"mailto:support@flowforge.com";

};



const callSupport=()=>{

window.location.href=
"tel:+18005552026";

};




function sendChat(){

if(!message.trim()) return;


alert(
"Message sent to FlowForge Support 🚀"
);


setMessage("");

}






return(

<Layout>

<div className="space-y-8">


{/* Header */}

<div>

<h1 className="text-4xl font-bold dark:text-white">
Help Center
</h1>


<p className="text-slate-500">
Find answers, tutorials and contact support.
</p>

</div>






{/* Search */}

<div className="relative rounded-2xl bg-white dark:bg-slate-900 shadow p-4">


<Search
className="absolute left-8 top-7 text-slate-400"
/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search help articles..."

className="w-full rounded-xl border p-3 pl-12 dark:bg-slate-800 dark:text-white"

/>


</div>









{/* Cards */}

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">



<div className="rounded-3xl bg-white dark:bg-slate-900 shadow p-6">

<BookOpen className="text-emerald-500"/>


<h2 className="mt-4 font-bold text-xl dark:text-white">
Documentation
</h2>


<p className="text-slate-500 mt-2">
Complete guides and documentation.
</p>


<button

onClick={openDocs}

className="mt-5 rounded-xl bg-emerald-500 px-5 py-2 text-white"

>

Open

</button>


</div>






<div className="rounded-3xl bg-white dark:bg-slate-900 shadow p-6">


<Video className="text-red-500"/>


<h2 className="mt-4 font-bold text-xl dark:text-white">

Video Tutorials

</h2>


<p className="text-slate-500 mt-2">

Learn FlowForge step by step.

</p>


<button

onClick={openVideo}

className="mt-5 rounded-xl bg-red-500 px-5 py-2 text-white"

>

Watch

</button>


</div>







<div className="rounded-3xl bg-white dark:bg-slate-900 shadow p-6">


<Mail className="text-blue-500"/>


<h2 className="mt-4 font-bold text-xl dark:text-white">

Email Support

</h2>


<p className="text-slate-500 mt-2">

support@flowforge.com

</p>



<button

onClick={emailSupport}

className="mt-5 rounded-xl bg-blue-500 px-5 py-2 text-white"

>

Contact

</button>


</div>








<div className="rounded-3xl bg-white dark:bg-slate-900 shadow p-6">


<MessageCircle className="text-purple-500"/>


<h2 className="mt-4 font-bold text-xl dark:text-white">

Live Chat

</h2>


<p className="text-slate-500 mt-2">

Chat with support team.

</p>


<button

onClick={()=>setChat(true)}

className="mt-5 rounded-xl bg-purple-500 px-5 py-2 text-white"

>

Start Chat

</button>


</div>




</div>








{/* FAQ */}

<div className="rounded-3xl bg-white dark:bg-slate-900 shadow p-8">


<h2 className="text-2xl font-bold dark:text-white mb-6">

FAQ

</h2>



<div className="space-y-4">


{
faqs
.filter(f=>
f.q.toLowerCase()
.includes(search.toLowerCase())
)
.map((faq,index)=>(


<details

key={index}

className="border rounded-xl p-5"

>


<summary className="cursor-pointer flex justify-between font-semibold dark:text-white">


{faq.q}

<ChevronDown/>


</summary>


<p className="mt-3 text-slate-500">

{faq.a}

</p>


</details>


))


}



</div>


</div>









{/* Bottom */}


<div className="grid md:grid-cols-2 gap-6">


<div className="rounded-3xl bg-white dark:bg-slate-900 shadow p-6">


<Bug className="text-red-500"/>


<h2 className="text-xl font-bold mt-4 dark:text-white">

Report Bug

</h2>


<button

onClick={()=>setBug(true)}

className="mt-5 bg-red-500 text-white px-5 py-3 rounded-xl"

>

Report

</button>


</div>






<div className="rounded-3xl bg-white dark:bg-slate-900 shadow p-6">


<Phone className="text-emerald-500"/>


<h2 className="text-xl font-bold mt-4 dark:text-white">

Contact Us

</h2>



<button

onClick={callSupport}

className="mt-5 bg-emerald-500 text-white px-5 py-3 rounded-xl"

>

Call

</button>


</div>



</div>









{/* Chat Modal */}


{
chat &&

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">


<div className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-[400px]">


<div className="flex justify-between">

<h2 className="text-xl font-bold dark:text-white">
FlowForge Chat
</h2>


<button onClick={()=>setChat(false)}>

<X/>

</button>


</div>



<textarea

value={message}

onChange={(e)=>setMessage(e.target.value)}

className="mt-5 w-full border rounded-xl p-3"

placeholder="Write message..."

>



</textarea>


<button

onClick={sendChat}

className="mt-4 flex gap-2 bg-purple-500 text-white px-5 py-3 rounded-xl"

>

<Send size={18}/>

Send

</button>



</div>


</div>

}







{/* Bug Modal */}


{
bug &&

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">


<div className="bg-white dark:bg-slate-900 p-8 rounded-3xl">


<h2 className="text-xl font-bold dark:text-white">

Report Bug

</h2>


<textarea

className="mt-5 border rounded-xl p-3"

placeholder="Describe issue..."

/>


<button

onClick={()=>{

alert("Bug report submitted ✅");

setBug(false);

}}

className="mt-4 bg-red-500 text-white px-5 py-3 rounded-xl"

>

Submit

</button>


</div>


</div>

}



</div>

</Layout>

);


}


export default Help;
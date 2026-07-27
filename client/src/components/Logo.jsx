import { Layers3 } from "lucide-react";

function Logo(){

return (

<div className="flex items-center gap-3">

<div className="
w-11 h-11
rounded-xl
bg-emerald-600
text-white
flex items-center justify-center
shadow
">

<Layers3 size={25}/>

</div>


<div>

<h1 className="
text-xl
font-bold
text-stone-800
">
FlowForge
</h1>

<p className="
text-xs
text-stone-500
">
Project Management
</p>

</div>


</div>

)

}

export default Logo;
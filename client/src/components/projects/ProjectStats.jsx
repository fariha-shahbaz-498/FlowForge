import {
  FolderKanban,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";


function ProjectStats({projects}){


const total = projects.length;


const completed =
projects.filter(
p=>p.status==="Completed"
).length;



const active =
projects.filter(
p=>p.status==="In Progress"
).length;



const budget =
projects.reduce(
(sum,p)=>sum+(p.budget || 0),
0
);



const cards=[

{
title:"Total Projects",
value:total,
icon:FolderKanban,
color:"bg-blue-500"
},


{
title:"Completed",
value:completed,
icon:CheckCircle,
color:"bg-green-500"
},


{
title:"Active",
value:active,
icon:Clock,
color:"bg-orange-500"
},


{
title:"Budget",
value:`$${budget}`,
icon:DollarSign,
color:"bg-purple-500"
}


];




return(

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">


{
cards.map((card,index)=>{


const Icon=card.icon;


return(

<div

key={index}

className="
rounded-3xl
bg-white
dark:bg-slate-900
p-6
shadow
border
dark:border-slate-700
"


>


<div className="flex justify-between">


<div

className={`
h-14
w-14
rounded-2xl
flex
items-center
justify-center
text-white
${card.color}
`}

>


<Icon size={26}/>


</div>



</div>



<h2 className="
mt-5
text-3xl
font-bold
dark:text-white
">

{card.value}

</h2>


<p className="
text-slate-500
dark:text-slate-300
mt-2
">

{card.title}

</p>



</div>


)


})

}



</div>


)

}


export default ProjectStats;
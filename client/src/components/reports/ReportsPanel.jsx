import {
  Download,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  BarChart3
} from "lucide-react";


const stats=[
{
 title:"Total Revenue",
 value:"$48,500",
 growth:"+18%",
 icon:DollarSign,
 color:"bg-emerald-500"
},
{
 title:"Completed Tasks",
 value:"1,248",
 growth:"+24%",
 icon:CheckCircle,
 color:"bg-blue-500"
},
{
 title:"Team Productivity",
 value:"96%",
 growth:"+12%",
 icon:Users,
 color:"bg-purple-500"
},
{
 title:"Growth Rate",
 value:"86%",
 growth:"+20%",
 icon:TrendingUp,
 color:"bg-orange-500"
}
];



const months=[
{
name:"Jan",
value:45
},
{
name:"Feb",
value:60
},
{
name:"Mar",
value:75
},
{
name:"Apr",
value:55
},
{
name:"May",
value:90
},
{
name:"Jun",
value:80
}
];




function ReportsPanel(){


function exportReport(){

alert("Report exported successfully 📄");

}



return(

<div className="space-y-8">


{/* Header */}

<div className="flex items-center justify-between">


<div>

<h1 className="text-4xl font-bold dark:text-white">
Reports & Analytics
</h1>

<p className="text-slate-500">
Business performance overview.
</p>

</div>



<button

onClick={exportReport}

className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-white"

>

<Download size={18}/>

Export Report

</button>


</div>







{/* KPI */}


<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">


{
stats.map((item,index)=>{


const Icon=item.icon;


return(

<div

key={index}

className="rounded-3xl bg-white dark:bg-slate-900 border p-6 shadow hover:-translate-y-2 transition"

>


<div className="flex justify-between">


<div

className={`${item.color} rounded-2xl p-3 text-white`}
>

<Icon size={24}/>

</div>


<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">

{item.growth}

</span>


</div>



<h2 className="mt-6 text-3xl font-bold dark:text-white">

{item.value}

</h2>


<p className="text-slate-500">

{item.title}

</p>


</div>


)


})

}



</div>








{/* Revenue Chart */}


<div className="rounded-3xl bg-white dark:bg-slate-900 border p-8 shadow">


<div className="flex items-center gap-3 mb-8">


<BarChart3 className="text-emerald-500"/>


<h2 className="text-2xl font-bold dark:text-white">

Revenue Growth

</h2>


</div>




<div className="flex items-end gap-6 h-72">


{
months.map((month,index)=>(


<div

key={index}

className="flex-1 flex flex-col items-center gap-3"

>


<div

className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 to-green-300 transition-all duration-700 hover:scale-105"

style={{

height:`${month.value}%`

}}


/>


<span className="text-sm text-slate-500">

{month.name}

</span>


</div>


))

}


</div>


</div>









{/* Performance */}


<div className="grid lg:grid-cols-2 gap-6">



<div className="rounded-3xl bg-white dark:bg-slate-900 border p-6 shadow">


<h2 className="text-xl font-bold dark:text-white">

Task Completion

</h2>


<div className="mt-6 space-y-5">


{
[
["Development",90],
["Design",75],
["Testing",65],
["Research",82]

].map((item,index)=>(


<div key={index}>


<div className="flex justify-between mb-2">

<span>{item[0]}</span>

<span>{item[1]}%</span>

</div>


<div className="h-3 bg-slate-200 rounded-full">


<div

className="h-3 rounded-full bg-emerald-500"

style={{
width:`${item[1]}%`
}}

/>


</div>


</div>


))

}


</div>


</div>







<div className="rounded-3xl bg-white dark:bg-slate-900 border p-6 shadow">


<h2 className="text-xl font-bold dark:text-white">

Team Performance

</h2>


<div className="mt-6 space-y-4">


{
[
"Frontend Team",
"Backend Team",
"Design Team",
"QA Team"

].map((team,index)=>(


<div

key={index}

className="flex justify-between rounded-xl bg-slate-100 dark:bg-slate-800 p-4"

>


<span>{team}</span>

<strong>

{90-index*5}%

</strong>


</div>


))

}


</div>


</div>


</div>



</div>


);


}


export default ReportsPanel;
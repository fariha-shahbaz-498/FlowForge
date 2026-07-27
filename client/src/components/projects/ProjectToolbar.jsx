import {
Search,
Star,
Filter
} from "lucide-react";


function ProjectToolbar({

search,
setSearch,
favoriteOnly,
setFavoriteOnly,
filter,
setFilter

}){


return(

<div className="
rounded-2xl
bg-white
dark:bg-slate-900
p-4
shadow
flex
flex-wrap
gap-4
items-center
">


<div className="
flex
items-center
gap-3
flex-1
">


<Search 
size={20}
className="text-slate-400"
/>


<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="Search projects..."

className="
w-full
outline-none
bg-transparent
dark:text-white
"

/>


</div>



<button

onClick={
()=>setFavoriteOnly(!favoriteOnly)
}

className={`
rounded-xl
px-4
py-2
flex
items-center
gap-2

${
favoriteOnly
?
"bg-yellow-400 text-white"
:
"bg-slate-100"
}

`}

>


<Star size={18}/>

Favorites


</button>



<div className="
flex
items-center
gap-2
">


<Filter size={18}/>


<select

value={filter}

onChange={
e=>setFilter(e.target.value)
}

className="
rounded-xl
border
p-2
dark:bg-slate-800
dark:text-white
"

>

<option>
All
</option>

<option>
Completed
</option>


<option>
In Progress
</option>


<option>
Planning
</option>


</select>


</div>


</div>


)


}


export default ProjectToolbar;
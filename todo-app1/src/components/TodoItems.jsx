import empty_icon from "../assets/empty.png";
import completed_icon from "../assets/completed.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({text, id, status, deleteTodo, toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={()=>toggle(id)} className="flex flex-1 items-center cursor-pointer">
        <img src={status ? completed_icon : empty_icon} alt="" className="w-7"/>
        <p className={`text-slate-700 ml-4 text-[17px] ${status ? "line-through" : ""}`}>{text}</p>
      </div>

      <img onClick={()=>deleteTodo(id)} src={delete_icon} alt="" className="w-5 cursor-pointer" />
    </div>
  )
}

export default TodoItems

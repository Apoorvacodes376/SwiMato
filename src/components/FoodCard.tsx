import { useNavigate } from "react-router-dom"

export default function FoodCard({id}:{id:string}) {
  const nav = useNavigate()
  return <div onClick={()=>nav(`/food/${id}`)}>🍕</div>
}

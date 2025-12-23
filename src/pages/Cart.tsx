import { useCart } from "../store/cartStore"

export default function Cart() {
  const items = useCart(s=>s.items)
  return (
    <>
      {items.map((i:any)=>
        <div style={{borderRadius:"50%", width:150, height:150}}>🍽️</div>
      )}
    </>
  )
}

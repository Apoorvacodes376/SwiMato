import gsap from "gsap"

export const shrinkToCart = (el:any, cart:any, cb:Function) => {
  gsap.to(el, {
    scale: 0,
    x: cart.x,
    y: cart.y,
    duration: 0.8,
    onComplete: ()=>cb()
  })
}

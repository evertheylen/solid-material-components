import { Slider } from "../components/slider"

export const SliderDemo = () => {
  let slider!: ReturnType<typeof Slider>;
  return (
    <>
      <Slider ref={slider}></Slider>
      <p>Value is {slider.value.get()}</p>
      <button onClick={() => slider.value.set(x => x+10)}>Add 10</button>
    </>
  )
}

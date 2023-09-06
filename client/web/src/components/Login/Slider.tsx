interface IProps {
  children: React.ReactNode;
}

export function Slider() {
  return (
    <div className="switch__container">
      <input id="switch-shadow" className="checked:bg-red-400 absolute" type="checkbox" />
      <label htmlFor="switch-shadow" className="grid rounded-xl bg-zinc-500 w-4 h-2 cursor-pointer px-4 py-2 before:-inset-0 before:bg-zinc-200 before:w-[0.75rem] before:h-4 before:rounded-xl checked:bg-red-400"></label>
    </div>
  )
}

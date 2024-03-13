import "./CustomInputTodoList.css"

export const CustomInput = ({placeholder, type, name, handler, statusDisabled , statusFocus}) => {

    return (
        <input readOnly ={statusDisabled} disabled={statusFocus} placeholder={placeholder} type={type} name={name} onChange={(e) => handler(e)}></input>
        <button></button>
    )
}
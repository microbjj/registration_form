import clsx from "clsx"
import { useRef } from "react"
import { useState } from "react"

function sendForm(state) {
    console.log(state)
}

function App() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
    })
    const [errors, setErrors] = useState({})
    const submitButtonRef = useRef(null)

    function onSubmit(event) {
        event.preventDefault()
        const validationErrors = validationForm(formData)

        if (Object.keys(validationErrors).length === 0) {
            sendForm(formData)
        } else {
            setErrors(validationErrors)
        }
    }

    function validationForm({ email, password, password2 }) {
        const newError = {}

        if (!email) {
            newError.email = "Укажите почту"
        }

        if (!password) {
            newError.password = "Укажите пароль"
        } else if (!/(?=.*[!$*#?&])(?=.*\d)/.test(password)) {
            newError.password =
                "Пароль должен содержать минимум одну цифру, один спецсимвол !$*#?&"
        } else if (password.length < 8) {
            newError.password = "Пароль должен содержать минимум 8 символов"
        }

        if (!password2) {
            newError.password2 = "Подтвердите пароль"
        } else if (password !== password2) {
            newError.password2 = "Пароли не совпадают"
        }

        return newError
    }

    const onChange = ({ target }) => {
        const { name, value } = target

        const currentState = { ...formData, [name]: value }
        setFormData(currentState)

        const validationErrors = validationForm(currentState)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            submitButtonRef.current.focus()
        }
    }

    const { email, password, password2 } = formData
    const isSubmitButtonDisabled =
        !email || !password || !password2 || Object.keys(errors).length > 0

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Registration form
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form method="POST" className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={onChange}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.email && (
                            <span className="text-[11px] text-red-500">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.password && (
                            <span className="text-[11px] text-red-500">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password2"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Repeat password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password2"
                                name="password2"
                                type="password"
                                value={password2}
                                onChange={onChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.password2 && (
                            <span className="text-[11px] text-red-500">
                                {errors.password2}
                            </span>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitButtonDisabled}
                            ref={submitButtonRef}
                            className={clsx(
                                "flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs",
                                isSubmitButtonDisabled
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-500",
                            )}
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default App

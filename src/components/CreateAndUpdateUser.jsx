import { useState, useEffect } from "react"

const CreateAndUpdateUser = (props) => {
    // use State Hook Implemented
    const [state, setState] = useState({
        name: "",
        phone: "",
        email: "",
        id: null,
        isLoading: false,
        showErrorMessage: false,
        showNameErrorMessage: false,
        showPhoneErroMessage: false,
        showEmailErrorMessage: false,
    })
    // Props Destructuring
    const { addUser, action, id } = props
    // user Effect Hook Implementation
    useEffect(() => {
        if (action === 'UPDATE') {
            setState((prev) => ({ ...prev, isLoading: true }))
            const getUserDetails = async () => {
                const url = `https://jsonplaceholder.typicode.com/users/${id}`
                const options = {
                    method: "GET",
                }
                fetch(url, options)
                    .then((response) => {
                        if (response.ok === true) {
                            setState((prev) => ({ ...prev, isLoading: false }))
                            return response.json()
                        } else {
                            return
                        }
                    })
                    .then((jsonData) => {
                        const { name, email, phone } = jsonData
                        setState((prev) => ({ ...prev, name, email, phone, isLoading: false }))
                    })
                    .catch((error) => {
                        setState((prev) => ({ ...prev, isLoading: false }))
                        console.log(error)
                    })
            }
            getUserDetails()
        }
    }, [action, id])
    const inputName = (event) => {
        setState((prev) => ({ ...prev, name: event.target.value }))
    }
    const inputPhone = (event) => {
        setState((prev) => ({ ...prev, phone: event.target.value }))
    }
    const inputEmail = (event) => {
        setState((prev) => ({ ...prev, email: event.target.value }))
    }
    const goBackHandle = () => {
        addUser(undefined)
    }
    // Name Validation Function
    const checkNameValidation = (event) => {
        if (event.target.value === '') {
            setState((prev) => ({ ...prev, showNameErrorMessage: true }))
        } else {
            setState((prev) => ({ ...prev, showNameErrorMessage: false }))
        }
    }
    // Phone Number Validation Function
    const checkPhoneValidation = (event) => {
        if (event.target.value === '') {
            setState((prev) => ({ ...prev, showPhoneErroMessage: true }))
        } else {
            setState((prev) => ({ ...prev, showPhoneErroMessage: false }))
        }
    }
    // Email Validation Function
    const checkEmailValidation = (event) => {
        if (event.target.value === '') {
            setState((prev) => ({ ...prev, showEmailErrorMessage: true }))
        } else {
            setState((prev) => ({ ...prev, showEmailErrorMessage: false }))
        }
    }
    // Submit Form Function
    const submitForm = (event) => {
        event.preventDefault();
        if (name !== '' && phone !== '' && email !== '') {
            setState((prev) => ({ ...prev, isLoading: true, showErrorMessage: false }))
            const user = {
                name,
                phone,
                email,
                id
            }
            const url = action === 'CREATE' ? 'https://jsonplaceholder.typicode.com/users' :
                `https://jsonplaceholder.typicode.com/users/${id} `;
            const options = {
                method: action === 'CREATE' ? "POST" : "PUT",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            }
            fetch(url, options)
                .then((response) => {
                    if (response.ok === true) {
                        return response.json()
                    } else {
                        return
                    }
                })
                .then((jsonData) => {
                    setState((prev) => ({ ...prev, isLoading: false }))
                    if (action === 'CREATE') {
                        addUser(jsonData, action, null)
                    } else {
                        addUser(jsonData, action, id)
                    }
                })
                .catch((error) => {
                    setState((prev) => ({ ...prev, isLoading: false }))
                    console.log(error)
                })
        } else {
            setState((prev) => ({ ...prev, showErrorMessage: true }))
        }
    }
    // state variables destructuring
    const {
        name,
        phone,
        email,
        isLoading,
        showErrorMessage,
        showPhoneErroMessage,
        showNameErrorMessage,
        showEmailErrorMessage } = state
    return (
        <div className="create-update-dialog" >
            <h3 className="under-line" > {action === 'CREATE' ? 'Create User' : "Update User"}</h3>
            <form onSubmit={submitForm} >
                <label>Name :</label>
                <input value={name} type="text" className="input-field" placeholder="Name" onBlur={checkNameValidation} onChange={inputName} />
                <br />
                {showNameErrorMessage && <p className="error-message"> * Name is Required</p>}
                <label>Phone :</label>
                <input value={phone} type="text" className="input-field" placeholder="Phone" onBlur={checkPhoneValidation} onChange={inputPhone} />
                <br />
                {showPhoneErroMessage && <p className="error-message"> * Phone Number is Required</p>}
                <label>Email :</label>
                <input value={email} type="text" className="input-field" placeholder="Email" onBlur={checkEmailValidation} onChange={inputEmail} />
                <br />
                {showEmailErrorMessage && <p className="error-message">* Email is Required</p>}
                <button type="submit" className="update-btn" >{action === 'CREATE' ? 'CREATE' : "UPDATE"}</button>
                <button type="button" className="delete-btn" onClick={goBackHandle} >BACK</button>
                <br />
                {showErrorMessage && <p className="error-message" >* Fill All Fields</p>}
                {isLoading && <img src="./loader_new.gif" alt="loading" width={45} height={45} />}
            </form>
        </div>
    )
}

export default CreateAndUpdateUser
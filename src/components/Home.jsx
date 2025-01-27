import { useState, useEffect } from "react"
import CreateAndUpdateUser from './CreateAndUpdateUser.jsx'
import Read from './Read.jsx'

const Home = () => {
    const [state, setState] = useState({
        id: null,
        user :{},
        userDetails: [],
        isLoading: false,
        currentView: "LIST",
    })
    useEffect(() => {
        const getUserDetails = async () => {
            setState((prev) => ({ ...prev, isLoading: true }))
            const url = 'https://jsonplaceholder.typicode.com/users'
            const options = {
                method: "GET"
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
                    setState((prev) => ({ ...prev, userDetails: jsonData, isLoading: false }))
                })
                .catch((error) => {
                    setState((prev) => ({ ...prev, isLoading: false }))
                    console.log(error)
                })
        }
        getUserDetails()
    }, [])
    const addUser = (newUser, action, id,) => {
        if (newUser !== undefined) {
            if (action === 'CREATE') {
                setState((prev) => ({ ...prev, currentView: "LIST", userDetails: [...userDetails, newUser] }))
            } else if (action === 'UPDATE') {
                const index = userDetails.findIndex((item) => item.id === id)
                userDetails.splice(index, 1, newUser)
                setState((prev) => ({ ...prev, userDetails, currentView: "LIST" }))
            }
        } else {
            setState((prev) => ({ ...prev, currentView: 'LIST' }))
        }
    }
    const handleUpdate = (id) => {
        setState((prev) => ({ ...prev, currentView: 'UPDATE', id }))
    }
    const handleRead = (user) => {
        setState((prev) => ({...prev, currentView: "READ", user}))
    }   
    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure to delete ?')
        if (confirm) {
            setState((prev) => ({ ...prev, isLoading: true }))
            const url = `https://jsonplaceholder.typicode.com/users/${id}`
            const options = {
                method: "DELETE",
            }
            fetch(url, options)
                .then((response) => {
                    if (response.ok === true) {
                        const filteredData = userDetails.filter((item) => item.id !== id);
                        setState((prev) => ({ ...prev, userDetails: filteredData, isLoading: false }))
                    } else {
                        return
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setState((prev) => ({ ...prev, isLoading: false }))
                })
        }
    }
    const renderLoader = () => {
        return (
            <div className="loader-view" >
                <img src="./loader_new.gif" alt="Loading" width={50} height={50} />
                <h2>Loading...</h2>
            </div>
        )
    }
    const renderData = () => {
        if (currentView === 'LIST') {
            return (
                <div>
                    <div className="d-flex" >
                        <h2 className="under-line ms-auto">User Details</h2>
                        <button type="button" className="update-btn ms-auto create-btn" onClick={addUserMethod} >+ ADD USER</button>
                    </div>
                    <table className="table" >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDetails.map((user, i) =>
                                <tr key={i}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button type="button" className='read-btn' onClick={e => handleRead(user)} >READ</button>
                                        <button type="button" className='update-btn' onClick={e => handleUpdate(user.id)} >UPDATE</button>
                                        <button type="button" className="delete-btn" onClick={e => handleDelete(user.id)} >DELETE</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        } else if (currentView === 'CREATE') {
            return <CreateAndUpdateUser addUser={addUser} id={null} action="CREATE" />
        } else if (currentView === 'UPDATE') {
            return <CreateAndUpdateUser addUser={addUser} id={id} action="UPDATE" />
        } else if (currentView === 'READ') {
            return <Read user={user} handleGoBack={handleGoBack} />
        }
    }
    const handleGoBack = () => {
        setState((prev) => ({...prev, currentView : "LIST"}))
    }
    const addUserMethod = () => {
        setState((prev) => ({ ...prev, currentView: 'CREATE' }))
    }
    const { userDetails, isLoading, currentView, id, user } = state
    return (
        <div>
            <div>
                {isLoading ? renderLoader() : renderData()}
            </div>
        </div>
    )
}

export default Home
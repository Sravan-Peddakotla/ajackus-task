const Read = (props) => {
    const { user, handleGoBack } = props
    const { name, phone, email } = user
    const goBackHandle = () => {
        handleGoBack()
    }
    return (
        <div className="create-update-dialog" >
            <h3 className="under-line">User Details</h3>
            <div className="user-detail">
                <b>Name : <span className="font-weight user-detail">{name}</span></b>
            </div>
            <br />
            <div className="user-detail">
                <b>Phone : <span className="font-weight user-detail">{phone}</span></b>
            </div>
            <br />
            <div className="user-detail">
                <b>email : <span className="font-weight user-detail">{email}</span></b>
            </div>
            <br />
            <button type="button" className="delete-btn" onClick={goBackHandle} >CLOSE</button>
        </div>
    )
}

export default Read
{
    /* Dari Sini */
}
;<h1 className="text-xl font-bold text-base-content pl-6 pb-2 pt-4">Users</h1>
{
    users?.length > 0 ? (
        <div className="flex flex-col pt-4 pl-4 mr-2 max-w-4xl">
            <label
                onClick={() => setUserModal((prev) => !prev)}
                className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse"
            >
                <span>+ Add User</span>
            </label>
            <div className="overflow-x-auto overflow-scroll overflow-y-hidden">
                <table className="table table-compact table-zebra mt-4">
                    <thead>
                        <tr>
                            <th className="w-24">id</th>
                            <th className="w-36">Name</th>
                            <th className="w-36">Role</th>
                            <th className="w-24">Email</th>
                            <th className="w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((obj) => (
                            <tr
                                key={obj.id}
                                className="group hover:text-accent cursor-pointer"
                            >
                                <td
                                    onClick={() => {
                                        openUserUpdate(obj)
                                    }}
                                >
                                    {obj.id}
                                </td>
                                <td
                                    onClick={() => {
                                        openUserUpdate(obj)
                                    }}
                                >
                                    {obj.name}
                                </td>
                                <td
                                    onClick={() => {
                                        openUserUpdate(obj)
                                    }}
                                >
                                    {obj.role}
                                </td>
                                <td
                                    onClick={() => {
                                        openUserUpdate(obj)
                                    }}
                                >
                                    {obj.email}
                                </td>
                                <td>
                                    <div className="flex">
                                        <button
                                            onClick={() =>
                                                confirm('Delete user?', () =>
                                                    userDelete(obj.id)
                                                )
                                            }
                                            className="btn btn-xs btn-error px-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="#000000aa"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => {
                                                openUserUpdate(obj)
                                            }}
                                            className="btn btn-xs btn-success px-2 ml-1"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className="ml-4 mt-4">
            <label
                onClick={() => setUserModal((prev) => !prev)}
                className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse"
            >
                <span>+ Add User</span>
            </label>
            <h1 className="opacity-50 ml-2">No User</h1>
        </div>
    )
}
{
    /* --------- */
}
;<div
    className={`modal modal-bottom sm:modal-middle ${
        userModal && 'modal-open'
    }`}
>
    <div className="modal-box relative">
        <form onSubmit={userSubmit}>
            <h3 className="font-bold text-lg">Add new user</h3>
            <div className="divider"></div>

            <div className="form-control w-full max-w-xs mb-2">
                <label className="label">
                    <span className="label-text">User Name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={(event) => handleUserChange(event)}
                    placeholder="e.g. John Doe"
                    className="input input-bordered text-base w-full max-w-xs"
                    required
                />
            </div>

            <div className="form-control w-full max-w-xs mb-2">
                <label className="label">
                    <span className="label-text">Role</span>
                </label>
                <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(event) => handleUserChange(event)}
                    name="role"
                    value={userForm.role}
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            <div className="form-control w-full max-w-xs mb-2">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={(event) => handleUserChange(event)}
                    placeholder="e.g. johndoe@example.com"
                    className="input input-bordered text-base w-full max-w-xs"
                    required
                />
            </div>

            <div className="modal-action">
                <label
                    htmlFor="user-modal"
                    className="btn bg-none"
                    onClick={() => setUserModal((prev) => !prev)}
                >
                    Cancel
                </label>
                <button className="btn btn-success">Save</button>
            </div>
        </form>
    </div>
</div>

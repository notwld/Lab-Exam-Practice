import React, { Component } from 'react'

export default class Days extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: [],
            DId: 0,
            DayName: "",
            Status: 0
        }
    }

    fetchDays() {
        fetch("https://localhost:44396/api/Day")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ days: data })
            })
    }

    componentDidMount() {
        this.fetchDays();

    }
    refreshModal() { //optional
        this.setState(
            {
                DId: 0,
                DayName: "",
                Status: 0
            }
        )
    }
    createData() {
        fetch("https://localhost:44396/api/Day",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    DayName: this.state.DayName,
                    Status: this.state.Status
                })
            }
        )
            .then((res) => {
                alert("data added!")
                this.fetchDays()
            })
            .catch((err) => alert("error", err))
    }
    UpdateData() {
        fetch("https://localhost:44396/api/Day",
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    DId: this.state.DId,
                    DayName: this.state.DayName,
                    Status: this.state.Status
                })
            }
        )
            .then((res) => {
                alert("data updated!")
                this.fetchDays()
            })
            .catch((err) => alert("error", err))
    }
    DeleteDay(id) {
        fetch("https://localhost:44396/api/Day",
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    DId: id,

                })
            }
        )
            .then((res) => {
                alert("data deleted!")
                this.fetchDays()
            })
            .catch((err) => alert("error", err))
    }
    render() {
        const { days, DId, DayName, Status } = this.state

        return (
            <div className='container my-5'>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>
                        Days
                    </h1>

                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { this.refreshModal() }} >
                        Add Day
                    </button>
                </div>
                <table class="table my-3">
                    <thead>
                        <tr>
                            <th scope="col">DId</th>
                            <th scope="col">DayName</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            days.map((day) => {
                                return (
                                    <tr>
                                        <td>{day.DId}</td>
                                        <td>{day.DayName}</td>
                                        <td>{day.Status}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                this.setState({ DId: day.DId, DayName: day.DayName, Status: day.Status })
                                            }
                                            }>
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => {
                                                this.DeleteDay(day.DId)
                                            }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">DayName</label>
                                    <input type="text" class="form-control" value={this.state
                                        .DayName} onChange={(e) => this.setState({ DayName: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Status</label>
                                    <input type="text" class="form-control" value={this.state
                                        .Status} onChange={(e) => this.setState({ Status: e.target.value })} id="exampleInputPassword1" />
                                </div>



                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {
                                    DId === 0 ? <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => this.createData()}>Save changes</button> :
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => this.UpdateData()}>Update changes</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component, Fragment } from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class User extends Component {
    // Define state for the containers
    state = {
        users: [],
        userCount: 0,
        friends: [],
        userName: null,
        userId: null
    }
    // Method to get list of users
    getUserList = (currentPage = 0) => {
        const skip = currentPage * 2;
        axios.get(`user?skip=${skip}&take=2`)
        .then(response => {
          this.setState({
            users: response.data.data[0],
            userCount: response.data.data[1]
          })
        })
      }

    // Method to get list of friends and friends of friends
    getFriends = (userId, name) => {
        axios.get(`user/${userId}/friend`)
        .then(response => {
            this.setState({
                friends: response.data.data[0],
                userId: userId,
                userName: name
            })
        })
    }

    // Handler pagination for users table
    handlePageChange = (selectedObject) => {
		this.getUserList(selectedObject.selected);
	};

    // Get users list when page loads
    componentDidMount() {
        this.getUserList();
    }

    render() {

        let i = 1;
        const userTable = this.state.users.map(user => {
            return ( 
                    <tr key={user.id}>
                        <td>{i++}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>
                            <button onClick={() => this.getFriends(user.id, user.firstname)}>
                                Friends    
                            </button>
                        </td>
                    </tr>
            )
            })

        let j = 1;
        const friendsTable = this.state.friends.map(user => {
            const friend = (user.requestee.id !== this.state.userId) ? user.requestee : user.requester
            return ( 
                 <tr key={user.id}>
                     <td>{j++}</td>
                     <td>{friend.firstname}</td>
                     <td>{friend.lastname}</td>
                     <td>
                         <button onClick={() => this.getFriends(friend.id, friend.firstname)}>
                             Friends    
                         </button>
                     </td>
                 </tr>
            )
         })
        return(
            <Fragment>
                {/* Users List */}
                <div>
                    <h1>Users</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTable}
                        </tbody>
                    </table>  
                    <ReactPaginate
                            pageCount={(this.state.userCount / 2)}
                            pageRange={2}
                            marginPagesDisplayed={2}
                            onPageChange={this.handlePageChange}
                            containerClassName={'container'}
                            previousLinkClassName={'page'}
                            breakClassName={'page'}
                            nextLinkClassName={'page'}
                            pageClassName={'page'}
                            disabledClassNae={'disabled'}
                            activeClassName={'active'}
                        />                                        
                </div>
                
                {/* Friends List */}
                {
                    (this.state.userId) ?
                        <div>
                        <h1>{this.state.userName} Friends</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr No</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {friendsTable}
                            </tbody>
                        </table>                                              
                    </div>  
                    : null
                }              
            </Fragment>

        );
    }
}

export default User;
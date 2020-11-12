import React, { Component, Fragment } from 'react';
import apiUser from '../../../api/User';
import User from '../../../model/User';
import Input from '../../../compnents/Input';

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      info: null,
    }
  }

  // static async getInitialProps(context) {
  //   const data = { name: '정준호' }
  //   const response = await apiUser.getUserInfo(data);
  //   const responseData = response.data;
  //   return { userResult: responseData }
  // }

  componentDidMount() {
    // console.log(new User())
    // console.log(this.props.userResult)
    // const user = new User(this.props.userResult);
    // console.log(user.getUserName);
  }

  submit = async () => {
    console.log(this.state.name)
    const data = { name: this.state.name };
    const response = await apiUser.getUserInfo(data);
    const responseData = response.data;
    
    const user = new User(responseData);
    const userInfo = user.getUserInfo();

    this.setState({
      info: userInfo
    })
  }

  render() {
    return (
      <Fragment>
        <Input
          id="name"
          label="이름"
          onChange={name => this.setState({ name: name ? name : null })}
          value={this.state.name}
        />
        <button onClick={this.submit}>
          검색
        </button>

        <div>
          <h2>결과</h2>
          {
            this.state.info && JSON.stringify(this.state.info)
          }
        </div>
      </Fragment>
    )
  }
}

export default UserInfo
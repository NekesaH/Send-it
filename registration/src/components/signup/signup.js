import './signup.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextBox from '../../core/textField/textField';
import { Component } from 'react';

import axios from 'axios';
 
// class Signup extends Component() {
//  render(){
//   return (
//     <div className="card">
//     <Card>
//       <CardContent>
//         <h1>Registration Form here</h1>
//       </CardContent>
//       <CardActions>
//         <Button> Button </Button>
//       </CardActions>
//     </Card>
//     </div>
//   );
//  }
// }
 
class Signup extends Component{

constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email:'',
      phone:'',
      password:'',
      passwordConfirm:'',

    }

  }
  onChangeName(e){
    this.setState({
      name:e.target.value
    });
  }
  onChangeEmail(e){
    this.setState({
      email:e.target.value
    });
  }
  onChangePhone(e){
    this.setState({
      phone:e.target.value
    });
  }
  onChangePassword(e){
    this.setState({
      password:e.target.value
    });
  }
  onChangePasswordConfirm(e){
    this.setState({
      passwordConfirm:e.target.value
    });


  }

  onSubmit(e){
    e.preventDefault();
    if(this.state.password == this.state.passwordConfirm){
    const obj = {
      name:this.state.name,
      email:this.state.email,
      phone:this.state.phone,
      password:this.state.password,
      passwordConfirm: this.state.passwordConfirm,
  };

  axios.post('http://localhost/reactProject/insert.php',obj)
    .then(res=> console.log(res.data))
    .catch(error => {
      console.log(error.response)
  });
  //To clear text box values 
  this.setState({
    name: '',
    email:'',
    phone:'',
    password:'',
    passwordConform:'',
 
  })
  }
  else{
    alert("Password mismatch")
  }
}


 render(){
  return (
        <div className="card">
        <Card className="cardStyle">

        <CardContent>
        <div className="signupText">SIGNUP</div>
        <TextBox label="Full Name" value={this.state.name} onChange={this.onChangeName}/>
        <TextBox label="Email" value={this.state.email} onChange={this.onChangeEmail} />
        <TextBox label="Phone" value={this.state.phone} onChange={this.onChangePhone} />
        <TextBox label="Password" value={this.state.password} onChange={this.onChangePassword}/>
        <TextBox label="Confirm Password" value={this.state.passwordConfirm} onChange={this.onChangePasswordConfirm}/>

      </CardContent>

      

          <CardActions className='CardActions'>
          <Button style={{background:'black',color:'white'}} onClick={this.onSubmit}> SIGNUP</Button>
          </CardActions>

        </Card>
        </div>
      );
  }
  
}


export default Signup;

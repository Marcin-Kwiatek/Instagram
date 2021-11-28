import React,{Component} from 'react';

class MainPage extends Component {
  componentDidMount(){
    fetch(`http://localhost:5000/currentUser/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': localStorage.getItem('accessToken')
                    },
                })
         }
  render(){
  return (
    <div>ta strona</div>
  )
  }
}

export default MainPage;

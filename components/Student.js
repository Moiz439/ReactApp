
import React, { Component } from "react";
import { Text, View } from 'react-native';


class Student extends Component{
   
    render(){
      return(
        <View>
          <Text style={{fontSize:30,color:'red'}}>
            Student Name : {this.props.name}
          </Text>
                  
        </View>
      )
    }
}
export default Student;
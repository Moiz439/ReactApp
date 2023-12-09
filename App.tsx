import React,{ useEffect, useState} from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList ,Modal,Button} from 'react-native';

const dummyData = [
  {
    id: "01",
    title: "Car Wash"
  },
  {
    id: "02",
    title: "Door Wh"
  }
];

const App = () => {
  const [note,setnote]=useState();
  const [notes,setNotes]=useState([]);
  const [name,setName]=useState("");
  const [dataList,setDataList]=useState([]);
  const [modal,setModal]=useState(false);
  const [selectedData,setSelectedData]=useState([]);
  const [UpdatedTask,setUpdatedTask]=useState("");
  // Add Data in API.
  const AddData=async ()=>{
    const url="http://192.168.43.37:3000/data";
    let result=await fetch(url,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"task":name})
      
    })
  }
  // Get API Data.
  const GetAPIData=async ()=>{
    
    const url="http://192.168.43.37:3000/data";
    let result=await fetch(url);
    result=await result.json();
    //console.warn(result);
    if(result){
      setDataList(result);
    }
  }
  useEffect(()=>{
    GetAPIData();
  },[GetAPIData])

  // Delete API Data
  const DeleteAPIData=async (id)=>{
    const url="http://192.168.43.37:3000/data";
    let result=await fetch(`${url}/${id}`,{
      method:'Delete'
    })
    result= await result.json();
    if(result){
      console.warn("Data Deleted!");
      GetAPIData();
    }
  }
  // Update API Data
  const UpdateTask=async ()=>{
    const url="http://192.168.43.37:3000/data";
    const id=selectedData.id;
    let result=await fetch(`${url}/${id}`,{
      method:'PUT',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"task":UpdatedTask})
    })
    if(result){
      console.warn("Data Updated!");
      setModal(false);
      GetAPIData();
    }
  }
  // Update API Data
  const UpdateData=(data)=>{
    setModal(true);
    setSelectedData(data);
    setUpdatedTask(data);
  }
  // Add function.

  const addTodo=()=>{
    if(note.length!==0){
    var dataCopy=notes;
    dataCopy.push(note);
    setNotes(dataCopy);
    console.warn(notes);
    }
  }

  return (
    <View>
      <Text style={{fontSize:30,textAlign:"center",fontWeight:600}}>To-Do App</Text>

      <TextInput style={styles.input} 
      placeholder="Enter You Task"
      onChangeText={(text)=>setName(text)}
      />

      <TouchableOpacity style={styles.add_btn} onPress={AddData}>
        <Text style={styles.add_btn_text}>Add</Text>
      </TouchableOpacity>

      <FlatList
        data={dataList} renderItem={({item})=>
        <View style={styles.display}>
          <Text style={styles.display_list_text}>{item.task}</Text>
          
          <TouchableOpacity onPress={()=>UpdateData(item)}>
            <Text style={styles.edit_btn}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>DeleteAPIData(item.id)} >
            <Text style={styles.delete_btn}>Delete</Text>
          </TouchableOpacity>
        </View>
      } />
      <Modal visible={modal} transparent={true}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <TextInput style={{
              borderColor:'skyblue',
              fontSize:18,
              borderWidth:2,
              borderRadius:10,
              marginTop:60,
              margin:20
              }}
              placeholder="Update Task..." 
              value={UpdatedTask.task}
              onChangeText={(text)=>setUpdatedTask(text)}
              />
            <View style={{margin:20}}><Button title="Update" onPress={UpdateTask}/></View>
            <View style={{margin:20,marginTop:5}}><Button title="Close" onPress={()=>setModal(false)}/></View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modal:{
    backgroundColor:'#fff',
    width:300,
    height:300,
    borderRadius:20,
    shadowColor:"black",
    elevation:10
  },
  input: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop:20
  },
  add_btn: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    marginVertical: 24,
    alignItems: "center"
  },
  add_btn_text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  display:{
    backgroundColor:"green",
    paddingHorizontal:6,
    paddingVertical:12,
    borderRadius:6,
    marginBottom:12,
    flexDirection:"row",
    alignItems:"center"
  },
  display_list_text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex:1
  },
  edit_btn: {
    color: "#fff",
    width:60,
    fontSize: 15,
    fontWeight: "bold",
    marginRight:10,
    textAlign:'center',
    backgroundColor:"blue",
    borderRadius:5,
    padding:5
  },
  delete_btn: {
    color: "#fff",
    fontSize: 15,
    width:60,
    fontWeight: "bold",
    textAlign:'center',
    marginRight:10,
    backgroundColor:"red",
    borderRadius:5,
    padding:5
  }
});

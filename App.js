import React, {useState,useEffect} from 'react';


import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';

export default function EditDetails () {
 
  const [name,setName]=useState("");
  const [desc,setDesc]=useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  

  function getEventDeatils(){
    fetch('http://contest-test-2.herokuapp.com/challenge/editDetails',
    {
        method: "PUT",
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          "ch_id":"612081460749a161f8735d38",
          "oid":"601d6dd74d7ac3000436a358",
          "ch_name":"ART CHAMPION",
          "desc":"FDSFSFSD",
        })
    }).then((result)=>{
      result.json().then((resp)=>{
            setName(resp.ch_name)
            setDesc(resp.desc)
            console.warn(resp)
      })
  }).catch(error => console.log(error));
  }
    return (
      <View
        style={{
          marginTop: 0,
          flex: 1,
        }}>
        <Button
          title="Edit"
          style={styles.btn}
          onPress={toggleModal}
        />
        <Modal
          onShow={getEventDeatils()}
          onRequestClose={toggleModal}
          transparent={true}
          visible={isModalVisible}
          animationType="slide">

          <View style={styles.mainview}>
            <View style={styles.subview}>
              <Text style={styles.header}>Edit Details</Text>
              <TextInput style={styles.items} value={name}>
           
              </TextInput>
              <TextInput
                style={styles.items}
                multiline={true}
                numberOfLines={4}
                value={desc}
              >
                
                </TextInput>
              <TouchableOpacity
                style={styles.btn}
                onPress={toggleModal}
                >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  UPDATE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
 
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'skyblue',
    borderRadius: 2,
    textAlign: 'center',
    fontSize: 20,
    elevation: 5,
    padding: 10,
    fontWeight: 'bold',
    width: '100%',
    letterSpacing: 4,
  },
  mainview: {
    flex: 1,
    justifyContent: 'center',
  },
  subview: {
    margin: 30,
    backgroundColor: 'skyblue',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
  },
  items: {
    marginTop: 30,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    width: '100%',
  },

  btn: {
    textAlign: 'center',
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    width: '60%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'orange',
    elevation: 7,
  },
});
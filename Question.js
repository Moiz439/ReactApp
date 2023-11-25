import React from 'react';
import { Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
const Question = (props) => {
  const { height, width } = Dimensions.get('window');
  var item = props.item;
  return (
    <View style={{ width: width }}>
      <Text style={{ fontSize: 25, fontWeight: '600', marginLeft: 20, marginRight: 20 }}>
        {'Ques: ' + item.question}</Text>

      <FlatList
        data={item.Options}
        renderItem={({ item, index }) =>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              elevation: 3,
              backgroundColor: '#fff',
              marginTop: 10,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 15,
            }}>
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: 'cyan',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ fontWeight: '600' }}>
                {
                  index == 0
                    ? 'A'
                    : index == 1
                      ? 'B'
                      : index == 2
                        ? 'C'
                        : 'D'

                }
              </Text>
            </View>
            <Text style={{fontSize:18,fontWeight:'600',marginLeft:20}}>{item}</Text>
          </TouchableOpacity>
        } />
    </View>
  )
}
export default Question;
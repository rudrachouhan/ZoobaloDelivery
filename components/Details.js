import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

const Details = ({ name, address, id, handleArr, arr }) => {
  
  const [del, setDel] = useState(1);
  const [pick, setPick] = useState(1);

  async function handleDone(){
    try {
      await axios.post('http://192.168.72.146:5000/createOrder', { id, delivered: del, picked: pick })
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange() {
    const result = arr.filter((user) => user.id != id);
    handleArr(result);
  }

  return (
    <View
      className="flex flex-col mx-auto px-4 bg-white pt-3 pb-6 rounded-lg border-[3px] border-slate-400 mb-10"
      style={{ width: wp(90) }}
    >
      <Text className="mb-1 text-3xl font-semibold">{name}</Text>
      <Text className='text-lg'>{address}</Text>
      <View className="flex flex-row items-center mt-7">
        <View>
          <Text className="text-3xl">Delivered:</Text>
        </View>
        <View className="flex flex-row bg-orange-500 rounded-md ml-6 justify-around items-center text-white text-xl py-1 px-2" style={{ width: wp(25) }}>
          <Pressable onPress={()=>{setDel(prev => prev - 1)}}>
            <Text className='text-3xl text-white'>-</Text>
          </Pressable>
          <Text className='text-xl text-white'>{del}</Text>
          <Pressable onPress={()=>{setDel(prev => prev + 1)}}>
            <Text className='text-2xl text-white'>+</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex flex-row items-center mt-7">
        <View>
          <Text className="text-3xl">Picked Up:</Text>
        </View>
        <View className="flex flex-row bg-orange-500 rounded-md ml-4 justify-around items-center text-white text-xl py-1 px-2" style={{ width: wp(25) }}>
          <Pressable onPress={()=>{setPick(prev => prev - 1)}}>
            <Text className='text-3xl text-white'>-</Text>
          </Pressable>
          <Text className='text-xl text-white'>{pick}</Text>
          <Pressable onPress={()=>{setPick(prev => prev + 1)}}>
            <Text className='text-2xl text-white'>+</Text>
          </Pressable>
        </View>
      </View>

      <View className='flex items-end'>
        <TouchableOpacity onPress={() => { handleDone(); handleChange(); }}  className="py-2 bg-green-400 rounded-md mt-8" style={{width:wp(25)}}>
        <Text className='text-white text-2xl text-center'>Done</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default Details;

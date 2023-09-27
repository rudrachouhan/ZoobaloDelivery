import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

const Details = ({ name, address, id, handleArr, arr }) => {

  const [del, setDel] = useState(1);
  const [pick, setPick] = useState(1);

  async function handleDone() {
    try {
      await axios.post('http://192.168.43.204:5000/createOrder', { id, delivered: del, picked: pick })
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
        <View className="flex flex-row bg-orange-500 rounded-md ml-4 items-center text-white">
          <Pressable onPress={() => { setDel(prev => prev - 1) }}>
            <Text className='text-3xl text-white py-1 px-4'>-</Text>
          </Pressable>
          <Text className='text-xl text-white px-1'>{del}</Text>
          <Pressable onPress={() => { setDel(prev => prev + 1) }}>
            <Text className='text-2xl text-white py-1 px-4'>+</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex flex-row items-center mt-7">
        <View>
          <Text className="text-3xl">Picked Up:</Text>
        </View>
        <View className="flex flex-row bg-orange-500 rounded-md ml-4 items-center text-white">
          <Pressable onPress={() => { setPick(prev => prev - 1) }}>
            <Text className='text-3xl text-white py-1 px-4'>-</Text>
          </Pressable>
          <Text className='text-xl text-white px-1'>{pick}</Text>
          <Pressable onPress={() => { setPick(prev => prev + 1) }}>
            <Text className='text-2xl text-white py-1 px-4'>+</Text>
          </Pressable>
        </View>
      </View>

      <View className='flex items-end'>
        <TouchableOpacity onPress={() => { handleDone(); handleChange(); }} className="p-2 bg-green-400 rounded-md mt-8">
          <Text className='text-white text-2xl text-center'>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;

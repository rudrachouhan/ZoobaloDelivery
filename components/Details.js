import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

const Details = ({ name, address, id, userId, handleArr, data, mobile, due, results, handleResult }) => {

  const [del, setDel] = useState(1);
  const [pick, setPick] = useState(1);
  const [mob, setMob] = useState(false);

  async function handleDone() {
    try {
      await axios.post('http://75.101.246.39:5000/createOrder', { id, userId, delivered: del, picked: pick })
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange() {
    console.log(data, "data")
    console.log(results, "result")
    const dataResult = data.filter((user) => user.userId != userId);
    handleArr(dataResult);
    if (results) {
      const result = results.filter((result) => result.userId != userId)
      handleResult(result)
    }
  }

  return (
    <View
      className="flex flex-col mx-auto px-4 bg-white pt-3 pb-6 rounded-lg border-[3px] border-slate-400 mb-10"
      style={{ width: wp(90) }}
    >
      <View className='flex flex-row justify-between items-center mb-2'>
        <Text className="text-3xl font-semibold" style={{width:wp(45)}}>{name}</Text>
        <TouchableOpacity onPress={() => setMob(true)} className='py-2 px-3 rounded-lg bg-orange-500'>
          <Text className='text-lg text-white font-semibold'>Show Contact</Text>
        </TouchableOpacity>
      </View>

      <Text className='text-lg' style={{ width: wp(50) }}>{address}</Text>
      <View className="flex flex-row items-center mt-7">
        <View>
          <Text className="text-2xl mr-2">Delivered:</Text>
        </View>
        <View className="flex flex-row bg-orange-500 rounded-md ml-4 items-center text-white">
          <TouchableOpacity onPress={() => { setDel(prev => prev - 1) }}>
            <Text className='text-3xl text-white py-1 px-4'>-</Text>
          </TouchableOpacity>
          <Text className='text-xl text-white px-1'>{del}</Text>
          <TouchableOpacity onPress={() => { setDel(prev => prev + 1) }}>
            <Text className='text-2xl text-white py-1 px-4'>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-row items-center mt-7">
        <View>
          <Text className="text-2xl">Picked Up:</Text>
        </View>
        <View className="flex flex-row bg-orange-500 rounded-md ml-4 items-center text-white">
          <TouchableOpacity onPress={() => { setPick(prev => prev - 1) }}>
            <Text className='text-3xl text-white py-1 px-4'>-</Text>
          </TouchableOpacity>
          <Text className='text-xl text-white px-1'>{pick}</Text>
          <TouchableOpacity onPress={() => { setPick(prev => prev + 1) }}>
            <Text className='text-2xl text-white py-1 px-4'>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className='mt-7 mb-2'>
        <Text className='font-bold text-xl'>Due tiffin: {due}</Text>
      </View>

      <View className='flex flex-row justify-between items-center'>
        <Text className={`text-xl mt-7 ${mob ? 'block' : 'hidden'}`}>Mob No: {mobile}</Text>
        <TouchableOpacity onPress={() => { handleDone(); handleChange(); }} className="py-2 px-3 bg-green-400 rounded-md mt-8">
          <Text className='text-white text-2xl text-center'>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;

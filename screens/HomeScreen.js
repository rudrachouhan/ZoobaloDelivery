import { View, Text, ScrollView, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../assets/images/logo1.png'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Details from '../components/Details';
import axios from 'axios';


const HomeScreen = () => {

  const [arr, setArr] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('http://192.168.43.204:5000/getUsers')
      const users = await res.json()
      console.log(users)
      console.log('hi')
      setArr(users)
    }

    getUsers()
    }, [])


  return (
    <SafeAreaView>
      <ScrollView>
              <View className='flex justify-center items-center mt-[-10%]'>
                  <Image source={logo} style={{width:wp(40)}} resizeMode='contain' />
        </View>
        <View>
          <Text className='mt-[-5%] text-2xl ml-7 text-green-400 font-semibold'>Hi! 👋</Text>
          <Text className='text-orange-500 mt-4 ml-7 text-xl tracking-wider font-semibold'>Delivery<Text className='text-green-400'>MATE</Text></Text>
        </View>
        <View className='mt-8'>
          {
            arr.map((user) => {
              return (
                <Details key={user.id} name={user.name} address = {user.address} />
              )
            })
          }
        </View>
          
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
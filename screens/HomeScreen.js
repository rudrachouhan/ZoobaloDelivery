import { View, Text, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../assets/images/logo1.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Details from '../components/Details';
import axios from 'axios';

const HomeScreen = () => {
  const [arr, setArr] = useState([]);
  const [login, setLogin] = useState(false);

  function handleArr(newValue) {
    setArr(newValue);
  }

  async function handleLogin() {
    try {
      await axios.post('http://192.168.43.204:5000/login')
      setLogin(true)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
      await axios.post('http://192.168.43.204:5000/logout')
      setLogin(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getLogin = async () => {
      try {
        const { data } = await axios.get('http://192.168.43.204:5000/getLogin')
        setLogin(data[0].action == 'logout' ? false : true)
      } catch (error) {
        console.log()
      }
    }
    getLogin()
    fetch('http://192.168.43.204:5000/getUsers').then(data => {
      return data.json().then(data => {
        setArr(data);
      })
    }).catch(error => { console.log(error) })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='flex justify-center items-center mt-[-10%]'>
          <Image source={logo} style={{ width: wp(40) }} resizeMode='contain' />
        </View>
        <View>
          <Text className='mt-[-5%] text-2xl ml-7 text-green-400 font-semibold'>Hi! 👋</Text>
          <Text className='text-orange-500 mt-4 ml-7 text-xl tracking-wider font-semibold'>Delivery<Text className='text-green-400'>MATE</Text></Text>
        </View>
        {login ? <View className='mt-8'>
          {
            arr.map((data) => {
              return (
                <Details key={data.userId} userId={data.userId} id={data.id} name={data.user.name} address={data.user.address} handleArr={handleArr} data={arr} />
              )
            })
          }
          <View>
            <TouchableOpacity onPress={handleLogout} className="mx-7 py-3 bg-orange-500 rounded-xl my-8" style={{ width: wp(85) }}>
              <Text className='text-white text-3xl text-center'>Logout</Text>
            </TouchableOpacity>
          </View>
        </View> :
          <TouchableOpacity onPress={handleLogin} className="mx-7 py-3 bg-green-400 rounded-xl mt-5" style={{ width: wp(85) }}>
            <Text className='text-white text-3xl text-center'>Login</Text>
          </TouchableOpacity>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
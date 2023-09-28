import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/logo1.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Details from "../components/Details";
import axios from "axios";

const HomeScreen = () => {
  const [arr, setArr] = useState([]);
  const [login, setLogin] = useState(false);

  function handleArr(newValue) {
    setArr(newValue);
  }

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/login')
      setLogin(true)
    } catch (error) {
      resizeBy.send(error)
    }
  }

  useEffect(() => {
    fetch("http://192.168.43.204:5000/getUsers")
      .then((data) => {
        return data.json().then((data) => {
          setArr(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex justify-center items-center mt-[-10%]">
          <Image source={logo} style={{ width: wp(40) }} resizeMode="contain" />
        </View>
        <View>
          <Text className="mt-[-5%] text-2xl ml-7 text-green-400 font-semibold">
            Hi! 👋
          </Text>
          <Text className="text-orange-500 mt-4 ml-7 text-xl tracking-wider font-semibold">
            Delivery<Text className="text-green-400">MATE</Text>
          </Text>
        </View>
        {login ? (
          <View className="mt-8">
            {arr.map((user) => {
              return (
                <Details
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  address={user.address}
                  handleArr={handleArr}
                  arr={arr}
                />
              );
            })}
          </View>
        ) : (
          <View className="ml-7 flex mt-10" style={{ alignSelf: 'flex-start' }}>
            <TouchableOpacity onPress={handleLogin} className="py-2 px-4 bg-blue-400 rounded-md">
              <Text className="text-white">Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

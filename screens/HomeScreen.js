import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/logo1.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Details from "../components/Details";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {

  const [arr, setArr] = useState([]);
  const [login, setLogin] = useState(false);
  const [searchinput, setSearchinput] = useState("");
  const [show, setShow] = useState(true);
  const [results, setResults] = useState([]);
  const [initialData, setInitialData] = useState([]);

  

  const goBack = () => {
    setShow(true);
    setResults(initialData);
    setSearchinput("");
  };

  function handleArr(newValue) {
    setArr(newValue);
  }

  function handleShow() {
    setShow(true);
  }

  async function handleLogin() {
    try {
      await axios.post('http://75.101.246.39:5000/login')
      setLogin(true)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
      await axios.post("http://75.101.246.39:5000/logout");
      setLogin(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getLogin = async () => {
      try {
        const { data } = await axios.get('http://75.101.246.39:5000/getLogin')
        setLogin(data[0].action == 'logout' ? false : true)
      } catch (error) {
        console.log()
      }
    }
    getLogin()
    fetch('http://75.101.246.39:5000/getUsers').then(data => {
      return data.json().then(data => {
        setArr(data);
        setResults(data);
        setInitialData(data);
      })
    }).catch(error => { console.log(error) })
  
  }, []);

  useEffect(() => {
    if (results != undefined) {
      const finalResults = results.filter((result) => {
        return result.user.name.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1;
      });

      setResults(finalResults);
    }
  }, [searchinput]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex flex-row items-center">
          <Pressable onPress={goBack} className="mr-16 mb-7 ml-4">
            <Ionicons name="arrow-back" size={40} color="black" />
          </Pressable>
          <Image
            source={logo}
            style={{ width: wp(40) }}
            resizeMode="contain"
            className="mt-[-8%]"
          />
        </View>
        <View
          className="-mt-10 mx-auto px-4 border-[2px] border-gray-300 rounded-lg flex flex-row items-center"
          style={{ width: wp(80) }}
        >
          <TextInput
            className="p-2 rounded-lg"
            style={{ width: wp(65) }}
            value={searchinput}
            placeholder="Search a User"
            onChangeText={(e) => setSearchinput(e)}
            onPressIn={() => setShow(false)}
          ></TextInput>
          <Pressable>
            <AntDesign name="search1" size={24} color="black" />
          </Pressable>
        </View>
        <View className="mt-8 ml-3">
          <Text className="mt-[-5%] text-2xl ml-7 text-green-400 font-semibold">
            Hi! 👋
          </Text>
          <Text className="text-orange-500 mt-4 ml-7 text-xl tracking-wider font-semibold">
            Delivery<Text className="text-green-400">MATE</Text>
          </Text>
        </View>
        {login ? (
          <View className="mt-8">
            {show &&
              arr.map((data) => {
                return (
                  <Details
                    key={data.userId}
                    userId={data.userId}
                    id={data.id}
                    name={data.user.name}
                    address={data.user.address}
                    handleArr={handleArr}
                    data={arr}
                    handleShow={handleShow}
                  />
                );
              })}
            {!show && (
              <View>
                {results.map((data) => {
                  return (
                    <Details
                      key={data.userId}
                      userId={data.userId}
                      id={data.id}
                      name={data.user.name}
                      address={data.user.address}
                      handleArr={handleArr}
                      data={arr}
                      handleShow={handleShow}
                    />
                  );
                })}
              </View>
            )}
            <View>
              <TouchableOpacity
                onPress={handleLogout}
                className="mx-7 py-3 bg-orange-500 rounded-xl my-8"
                style={{ width: wp(85) }}
              >
                <Text className="text-white text-3xl text-center">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleLogin}
            className="mx-7 py-3 bg-green-400 rounded-xl mt-5"
            style={{ width: wp(85) }}
          >
            <Text className="text-white text-3xl text-center">Login</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

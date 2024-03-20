import {Text, TextInput, View} from 'react-native';
import {CustomeButton, TopNavigation} from '../Components';
import tw from 'twrnc';
import {useState, useCallback} from 'react';
import {color} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WaterTracker = ({navigation}: any) => {
  const [water, setWater] = useState<string>('');
  const handleSubmit = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const {response}: any = await fetch('http://localhost:8080/water', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          water: water,
        }),
      });
      // Need to add token
      const data = await response.json();

      console.log({data});
    } catch (error) {
      console.log(error);
    }
  }, [water]);
  return (
    <>
      <TopNavigation navigation={navigation} />
      <View style={tw`h-full flex-1 mt-4 px-6 gap-y-12 `}>
        <Text style={tw`text-black text-4xl`}>Water Tracker</Text>
        <View>
          <Text style={tw`text-black text-lg font-semibold`}>
            Today's Water (liter) in take
          </Text>
          <TextInput
            style={[
              tw`h-14 w-full rounded-lg text-black text-2xl px-4`,
              {
                backgroundColor: color.primary,
              },
            ]}
            onChangeText={setWater}
            value={water}
            placeholder="Water"
            placeholderTextColor="black"
            inputMode="numeric"
          />
        </View>
        <View style={tw`w-full justify-center items-center`}>
          <CustomeButton
            onClick={handleSubmit}
            text="Save"
            style={[
              tw`h-12 w-20 rounded-lg flex justify-center items-center`,
              {
                backgroundColor: color.primary,
              },
            ]}
            textStyle={tw`text-black text-2xl `}
          />
        </View>
      </View>
    </>
  );
};

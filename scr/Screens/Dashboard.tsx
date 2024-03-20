import {Dimensions, ScrollView, Text, View} from 'react-native';
import {CustomeButton, TopNavigation} from '../Components';
import tw from 'twrnc';
import {color} from '..';

import {LineChart} from 'react-native-chart-kit';
import {useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeeklyLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthlyLabels = ['1 W', '2 W', '3 W', '4 W'];
const weeklyCalories = [5000, 1200, 2560, 8000, 4520, 2569, 1010];
const monthlyCalories = [50000, 128000, 12560, 58000];

const userData = {
  userName: 'Amit Paliwal',
  age: 25,
  weight: 55,
  todayCalories: 8555,
  weeklyCalories: 50000,
  monthlyCalories: 100000,
};

export const Dashboard = ({navigation}: any) => {
  const [tab, setTab] = useState<string>('weekly');
  const [, setUserData] = useState(); // need to add state and set data

  const getData = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const {response}: any = await fetch('http://localhost:8080/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // Need to add token
      const data = await response.json();
      setUserData(data);
      console.log({data});
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <TopNavigation navigation={navigation} />

      <ScrollView>
        <View style={tw`h-full flex-1 mt-4 px-6 gap-y-6 `}>
          <Text style={tw`text-black text-4xl`}>Dashboard</Text>
          <View
            style={[
              tw`w-full p-4 rounded-2`,
              {
                backgroundColor: color.primary,
              },
            ]}>
            <Text style={tw`text-black text-xl`}>
              Name: {userData.userName}
            </Text>
            <Text style={tw`text-black text-xl`}>
              Age: {userData.age} Years
            </Text>
            <Text style={tw`text-black text-xl`}>
              Weight: {userData.weight} Kg
            </Text>
          </View>
          <View
            style={[
              tw`w-full p-4 rounded-2`,
              {
                backgroundColor: color.primary,
              },
            ]}>
            <Text style={tw`text-black text-xl`}>
              Today: {userData.todayCalories} Calories
            </Text>
            <Text style={tw`text-black text-xl`}>
              This Week: {userData.weeklyCalories} Calories
            </Text>
            <Text style={tw`text-black text-xl`}>
              This Month: {userData.monthlyCalories} Calories
            </Text>
          </View>
          <View style={tw`w-full justify-start items-center gap-4`}>
            <View style={tw`w-full flex-row justify-start items-center gap-4`}>
              <CustomeButton
                onClick={() => setTab('weekly')}
                text="Track Weekly"
                style={[
                  tw`h-12 w-30 rounded-lg flex justify-center items-center`,
                  {
                    backgroundColor:
                      tab === 'weekly' ? color.primary_1 : color.primary,
                  },
                ]}
                textStyle={tw`text-black text-xl `}
              />
              <CustomeButton
                onClick={() => setTab('monthly')}
                text="Track Monthly"
                style={[
                  tw`h-12 w-30 rounded-lg flex justify-center items-center`,
                  {
                    backgroundColor:
                      tab === 'monthly' ? color.primary_1 : color.primary,
                  },
                ]}
                textStyle={tw`text-black text-xl `}
              />
            </View>
            <LineChart
              data={{
                labels: tab === 'weekly' ? WeeklyLabels : monthlyLabels,
                datasets: [
                  {
                    data: tab === 'weekly' ? weeklyCalories : monthlyCalories,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 50}
              height={320}
              yAxisSuffix="cal"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: color.primary,
                backgroundGradientFrom: color.primary_1,
                backgroundGradientTo: color.primary_1,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 8,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: color.primary_1,
                },
              }}
              style={tw`rounded-2`}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

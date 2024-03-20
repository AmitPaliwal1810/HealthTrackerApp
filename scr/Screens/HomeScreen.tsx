import {FlatList, Pressable, Text, View} from 'react-native';
import tw from 'twrnc';
import {color} from '..';
import {TopNavigation} from '../Components';
import {FC} from 'react';

type ItemProps = {title: string; navigateTo: string; navigation: any};

const DATA = [
  {
    id: '1',
    title: 'Step Tracker',
    navigateTo: '/stepTracker',
  },
  {
    id: '2',
    title: 'Calories Tracker',
    navigateTo: '/caloriesTracker',
  },
  {
    id: '3',
    title: 'Water Tracker',
    navigateTo: '/waterTracker',
  },
  {
    id: '4',
    title: 'Dashboard',
    navigateTo: '/dashboard',
  },
];

export const HomeScreen: FC<any> = ({navigation}) => {
  return (
    <>
      <TopNavigation navigation={navigation} />
      <View style={[tw`w-full h-full flex flex-1 justify-center p-4 bg-white`]}>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <Item
              title={item.title}
              navigateTo={item.navigateTo}
              navigation={navigation}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

const Item = ({title, navigateTo, navigation}: ItemProps) => {
  return (
    <Pressable
      onPress={() => navigation.navigate(navigateTo)}
      style={({pressed}) => [
        tw`w-full bg-white px-2 py-4 my-2 rounded-md `,
        {
          backgroundColor: pressed ? color.primary_1 : color.primary,
        },
      ]}>
      <Text style={tw`text-black text-2xl font-bold`}>{title}</Text>
    </Pressable>
  );
};

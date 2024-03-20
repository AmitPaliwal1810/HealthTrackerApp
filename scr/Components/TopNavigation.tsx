import {View, Image, Pressable} from 'react-native';
import tw from 'twrnc';
import {color} from '..';

export const TopNavigation = ({navigation}: any) => {
  return (
    <View
      style={[
        tw`w-full flex-row py-4 px-4 justify-between items-center`,
        {
          backgroundColor: color.primary,
        },
      ]}>
      <Pressable
        onPress={() => {
          navigation.navigate('/Home');
        }}
        style={({pressed}) => [
          tw`p-2 rounded-full`,
          {
            backgroundColor: pressed ? color.primary_1 : color.primary,
          },
        ]}>
        <Image source={require('../assets/burger.png')} style={tw`h-5 w-6`} />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('/dashboard');
        }}
        style={({pressed}) => [
          tw`p-2 rounded-full`,
          {
            backgroundColor: pressed ? color.primary_1 : color.primary,
          },
        ]}>
        <Image source={require('../assets/person.png')} />
      </Pressable>
    </View>
  );
};

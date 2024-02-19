import {Text, TextInput, View} from 'react-native';
import {CustomeButton, TopNavigation} from '../Components';
import tw from 'twrnc';
import {useState} from 'react';
import {color} from '..';

export const StepTracker = () => {
  const [step, setStep] = useState<string>('');
  return (
    <>
      <TopNavigation />
      <View style={tw`h-full flex-1 mt-4 px-6 gap-y-12 `}>
        <Text style={tw`text-black text-4xl`}>Step Tracker</Text>
        <View>
          <Text style={tw`text-black text-lg font-semibold`}>
            Today's Steps
          </Text>
          <TextInput
            style={[
              tw`h-14 w-full rounded-lg text-black text-2xl px-4`,
              {
                backgroundColor: color.primary,
              },
            ]}
            onChangeText={setStep}
            value={step}
            placeholder="Steps"
            placeholderTextColor="black"
            inputMode="numeric"
          />
        </View>
        <View style={tw`w-full justify-center items-center`}>
          <CustomeButton
            onClick={() => console.log({step})}
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

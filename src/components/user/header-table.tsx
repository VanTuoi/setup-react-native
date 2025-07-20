import { Text, View } from 'react-native';

export const renderHeader = () => (
  <View className="flex-row border-b border-gray-200 bg-gray-200 px-0 py-2">
    <View className="items-left flex-[1] justify-center pl-2">
      <Text className="text-md font-bold text-black">ID</Text>
    </View>
    <View className="flex-[2] justify-center">
      <Text className="text-md text-left font-bold text-black">Full Name</Text>
    </View>
    <View className="flex-[4] items-center justify-center">
      <Text className="text-md font-bold text-black">Email</Text>
    </View>
  </View>
);

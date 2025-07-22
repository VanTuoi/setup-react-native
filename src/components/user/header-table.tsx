import { Text, View } from 'react-native';

import { translate } from '@/lib/i18n';

export const renderHeader = () => (
  <View className="flex-row border-b border-gray-200 bg-gray-200 px-0 py-2 text-white dark:border-gray-700 dark:bg-gray-800">
    <View className="items-left flex-[2] justify-center pl-2">
      <Text className="text-md font-bold text-black dark:text-white">
        {translate('user.header.id')}
      </Text>
    </View>
    <View className="flex-[2] justify-center">
      <Text className="text-md text-left font-bold text-black dark:text-white">
        {translate('user.header.full_name')}
      </Text>
    </View>
    <View className="flex-[3] items-center justify-center">
      <Text className="text-md font-bold text-black dark:text-white">
        {translate('user.header.email')}
      </Text>
    </View>
    <View className="flex-[2] items-center justify-center">
      <Text className="text-md font-bold text-black dark:text-white">
        {translate('user.header.status')}
      </Text>
    </View>
  </View>
);

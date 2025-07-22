import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { User } from '@/api/user';

import { UserStatusItem } from './user-status-item';

export const UserItem = ({ item }: { item: User }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/user/${item.id}`)}
      className="flex-row items-center border-b border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-900"
    >
      <View className="flex-[2]">
        <Text className="text-sm text-black dark:text-white">{item.id}</Text>
      </View>

      <View className="flex-[2]">
        <Text className="text-left text-sm text-black dark:text-white">
          {item.name}
        </Text>
      </View>

      <View className="flex-[3]">
        <Text className="text-sm text-black dark:text-white">{item.email}</Text>
      </View>

      <View className="flex-[2] items-center">
        <UserStatusItem User={item} />
      </View>
    </Pressable>
  );
};

import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { User } from '@/api/user';

import { UserStatusItem } from './user-status-item';

export const UserItem = ({ item }: { item: User }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/user/${item.id}`)}
      className="flex-row items-center border-b border-gray-200 bg-white p-2"
    >
      <View className="flex-[2]">
        <Text className="text-sm text-black">{item.id}</Text>
      </View>

      <View className="flex-[2]">
        <Text className="text-left text-sm text-black">{item.name}</Text>
      </View>

      <View className="flex-[3]">
        <Text className="text-sm text-black">{item.email}</Text>
      </View>

      <View className="flex-[2] items-center">
        <UserStatusItem User={item} />
      </View>
    </Pressable>
  );
};

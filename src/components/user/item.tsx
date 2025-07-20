import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { type User } from '@/api/user';

export const UserItem = ({ item }: { item: User }) => {
  return (
    <Link href={`/user/${item.id}`} asChild>
      <Pressable>
        <View className="flex-row border-b border-gray-200 bg-white p-2">
          <View className="items-left flex-[1] justify-center">
            <Text className="text-sm text-black">{item.id}</Text>
          </View>
          <View className="flex-[2] justify-center">
            <Text className="text-left text-sm text-black">
              {item.firstName + ' ' + item.lastName}
            </Text>
          </View>
          <View className="items-left flex-[4] justify-center">
            <Text className="text-sm text-black">{item.email}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

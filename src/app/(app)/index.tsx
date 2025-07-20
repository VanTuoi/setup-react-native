import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import React from 'react';

import { useUsers } from '@/api/user';
import {
  Button,
  EmptyList,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { renderHeader } from '@/components/user/header-table';
import { UserItem } from '@/components/user/item';

export default function Home() {
  const { data, isPending, isError } = useUsers();

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Error when loading data</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: 'User manager',
          headerBackTitle: 'Feed',
          headerRight: () => (
            <Button
              label="New User"
              size="default"
              className="mr-5 bg-primary-500"
            />
          ),
        }}
      />
      <FocusAwareStatusBar />
      {renderHeader()}
      <FlashList
        data={data?.users}
        renderItem={({ item }) => <UserItem item={item} />}
        keyExtractor={(item) => item.username}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={60}
      />
    </View>
  );
}

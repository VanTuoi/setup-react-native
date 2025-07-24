import { FlashList } from '@shopify/flash-list';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

import { useUsers } from '@/api/user';
import {
  Button,
  EmptyList,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { HeaderTable } from '@/components/user/header-table';
import { UserItem } from '@/components/user/item';
import { SearchComponent } from '@/components/user/search';
import { useQueryParams } from '@/lib';
import { translate } from '@/lib/i18n';

export default function Home() {
  const { queryParams } = useQueryParams({ search: '' });
  const { data, isPending, isError, refetch } = useUsers({
    variables: {
      search: queryParams.search,
    },
  });

  const router = useRouter();

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('user.error_load')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Stack.Screen
        options={{
          title: translate('user.title'),
          headerBackTitle: translate('user.back_title'),
          headerRight: () => (
            <Button
              onPress={() => router.push('/user/add-user')}
              label={translate('user.new')}
              size="default"
              className="mr-5 bg-primary-500"
            />
          ),
        }}
      />
      <FocusAwareStatusBar />
      <SearchComponent />
      <HeaderTable />
      <FlashList
        data={data?.data}
        renderItem={({ item }) => <UserItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={60}
        refreshing={isPending}
        onRefresh={() => refetch()}
      />
    </View>
  );
}

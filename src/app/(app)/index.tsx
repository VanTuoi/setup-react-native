import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';

import { useUsers } from '@/api/user';
import {
  Button,
  EmptyList,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { PlusIcon } from '@/components/ui/icons/plus';
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
    <View className="flex-1 bg-white px-2 dark:bg-black">
      <FocusAwareStatusBar />
      <SearchComponent />
      <FlashList
        data={data?.data}
        renderItem={({ item }) => <UserItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={60}
        refreshing={isPending}
        onRefresh={() => refetch()}
        ItemSeparatorComponent={() => <View className="h-1" />}
      />
      <Button
        onPress={() => router.push('/user/add-user')}
        size="icon"
        className="absolute bottom-8 right-4 size-16 rounded-full bg-primary-500 shadow-lg"
      >
        <PlusIcon width={36} height={36} color="white" />
      </Button>
    </View>
  );
}

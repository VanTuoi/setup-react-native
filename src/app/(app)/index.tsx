import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

import { type FilterOption, useCourses } from '@/api/courses';
import { CoursesItem } from '@/components/courses/item';
import { SearchComponent } from '@/components/courses/search';
import { Button, EmptyList, FocusAwareStatusBar, Text } from '@/components/ui';
import { Grid } from '@/components/ui/icons/grid';
import { List } from '@/components/ui/icons/list';
import { PlusIcon } from '@/components/ui/icons/plus';
import { useQueryParams } from '@/lib';
import { translate } from '@/lib/i18n';

const defaultFilter: FilterOption = {
  search: '',
  sortBy: 'id',
  sortDirection: 'asc',
  categoryId: '',
};

export default function Home() {
  const router = useRouter();
  const { queryParams } = useQueryParams<FilterOption>(defaultFilter);
  const { data, isPending, isError, refetch } = useCourses({
    variables: queryParams,
  });

  const [isGridView, setIsGridView] = useState(false); // 👈 Toggle state

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-2 dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <View className="flex-col items-center justify-between">
        <SearchComponent />
        <View className="w-full items-end">
          <Button
            size="sm"
            variant="ghost"
            onPress={() => setIsGridView((prev) => !prev)}
          >
            {isGridView ? <List color={'#999'} /> : <Grid color={'#999'} />}
          </Button>
        </View>
      </View>

      <FlashList
        data={data?.data}
        renderItem={({ item }) => (
          <CoursesItem item={item} isGrid={isGridView} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={60}
        refreshing={isPending}
        onRefresh={() => refetch()}
        ItemSeparatorComponent={() => <View className="h-1" />}
        numColumns={isGridView ? 3 : 1}
        key={isGridView ? 'grid' : 'list'}
      />

      <Button
        onPress={() => router.push('/courses/add-courses')}
        size="icon"
        className="absolute bottom-8 right-4 size-16 rounded-full bg-primary-500 shadow-xl dark:bg-primary-400"
      >
        <PlusIcon width={36} height={36} color="white" />
      </Button>
    </View>
  );
}

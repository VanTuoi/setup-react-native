'use client';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '../ui';
import { Filter } from '../ui/icons';
import { SearchInput } from '../ui/search-input';

type Props = {
  onFilterPress?: () => void;
};

export const SearchComponent = ({ onFilterPress }: Props) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const search = typeof params.search === 'string' ? params.search : '';

  const handleSearchChange = (text: string) => {
    router.setParams({ search: text || '' });
  };

  return (
    <View className="flex-row items-center gap-10 px-1 pb-5 pt-2">
      <View className="flex-1">
        <SearchInput value={search} onChangeText={handleSearchChange} />
      </View>
      <Button
        size="default"
        className="h-10 border-gray-200 px-1"
        variant="outline"
        onPress={onFilterPress}
      >
        <View className="flex-row items-center gap-1">
          <Filter width={32} height={32} />
          <Text>Filter</Text>
        </View>
      </Button>
    </View>
  );
};
